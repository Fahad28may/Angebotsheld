import { Button } from "@/components/ui/Button";

interface StepNavProps {
  onBack?: () => void;
  backLabel?: string;
  nextLabel?: string;
  submitForm?: boolean;
}

export function StepNav({ onBack, backLabel = "Zurück", nextLabel = "Weiter", submitForm = true }: StepNavProps) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
      {onBack ? (
        <Button type="button" variant="ghost" onClick={onBack}>
          {backLabel}
        </Button>
      ) : (
        <span />
      )}
      <Button type={submitForm ? "submit" : "button"} size="lg">
        {nextLabel}
      </Button>
    </div>
  );
}
