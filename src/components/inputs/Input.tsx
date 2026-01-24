import { cn } from "@/utils/cn";
import { type FieldError } from "react-hook-form";
type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  error?: FieldError;
  isOptional?: boolean;
};
export default function Input({
  name,
  placeholder,
  disabled,
  className,
  label,
  error,
  isOptional,
  ...rest
}: TInputProps) {
  return (
    <div className="flex flex-col gap-y-1">
      <label
        htmlFor={name}
        className="text-xs text-neutral-400 pl-0.5 flex justify-between"
      >
        {label}
        {!isOptional ? null : (
          <span className="text-neutral-500">
            optional<span className="text-red-500 text-xs"> *</span>
          </span>
        )}
      </label>
      <input
        id={name}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          // Sizing & Padding
          "py-2 px-3 w-full",
          // Border and rounded corners
          "border border-neutral-800 rounded-md",
          // Background and text color using your CSS variables
          "text-foreground",
          // Focus state — Vercel uses a strong primary color ring
          "focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
          // Subtle transition for border and ring
          "transition-colors duration-150",
          // Disabled state
          "disabled:bg-neutral-800/60 disabled:text-neutral-600",
          "placeholder:text-sm",
          // error state
          error
            ? "border-red-500 focus:ring-red-500/30 focus:border-red-500"
            : "",
          className,
        )}
        {...rest}
      />
      {error ? (
        <span className="text-xs text-red-400 pl-0.5 font-extralight pt-0.5">
          {error.message}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
