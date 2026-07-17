import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`h-11 w-full rounded-md2 border bg-white px-3.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-accent-500 ${
          invalid ? "border-error" : "border-line"
        } ${className}`}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", invalid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full rounded-md2 border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-accent-500 ${
          invalid ? "border-error" : "border-line"
        } ${className}`}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
