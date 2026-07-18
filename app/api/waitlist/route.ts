import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// Storage choice: Resend Audiences (not Vercel KV) — a waitlist signup is
// exactly a "list of contacts to email later," which is what Resend
// Audiences are for, and it needs only two env vars with no separate
// database to provision. See .env.example.
const waitlistSchema = z.object({
  email: z.string().trim().email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  source: z.string().trim().min(1).max(64).default("unknown"),
  // Honeypot: a field real users never see or fill. Bots that blindly fill
  // every form field will populate it. Deliberately unconstrained here —
  // any value must still pass validation so the handler below can inspect
  // it and quietly drop the submission, rather than the bot getting a 400
  // that tips it off.
  companyWebsite: z.string().optional().default(""),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage. Bitte versuchen Sie es erneut." },
      { status: 400 }
    );
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." },
      { status: 400 }
    );
  }

  const { email, source, companyWebsite } = parsed.data;

  if (companyWebsite) {
    // Honeypot tripped — report success so the bot doesn't learn anything,
    // but don't actually add the address anywhere.
    console.log(
      JSON.stringify({ event: "waitlist_honeypot_blocked", source, timestamp: new Date().toISOString() })
    );
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_WAITLIST_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.warn(
      "Waitlist signup received but RESEND_API_KEY / RESEND_WAITLIST_AUDIENCE_ID is not configured."
    );
    return NextResponse.json(
      {
        ok: false,
        error: "Die Warteliste ist aktuell nicht verfügbar. Bitte versuchen Sie es später erneut.",
      },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.contacts.create({ email, audienceId, unsubscribed: false });

    if (result.error) {
      // Resend returns an error object (rather than throwing) for API-level
      // failures. A contact that already exists in the audience is a normal,
      // expected outcome here — treat it as a successful signup, not a
      // failure the user needs to see.
      const alreadyExists = /already exists|duplicate/i.test(result.error.message);
      if (!alreadyExists) {
        console.error("Resend contacts.create error:", result.error);
        return NextResponse.json(
          { ok: false, error: "Eintragung fehlgeschlagen. Bitte versuchen Sie es später erneut." },
          { status: 502 }
        );
      }
    }

    console.log(
      JSON.stringify({ event: "waitlist_signup", email, source, timestamp: new Date().toISOString() })
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Waitlist signup failed:", error);
    return NextResponse.json(
      { ok: false, error: "Eintragung fehlgeschlagen. Bitte versuchen Sie es später erneut." },
      { status: 502 }
    );
  }
}
