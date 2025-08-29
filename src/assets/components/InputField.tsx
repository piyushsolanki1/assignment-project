import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

type Variant = "filled" | "outlined" | "ghost";
type Size = "sm" | "md" | "lg";

interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: Variant;
  size?: Size;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  clearable,
  showPasswordToggle,
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // size classes
  const sizeClasses =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "lg"
      ? "px-4 py-3 text-lg"
      : "px-3 py-2";

  // variant classes
  const variantClasses =
    variant === "filled"
      ? "bg-gray-100 dark:bg-gray-800 border border-transparent"
      : variant === "ghost"
      ? "bg-transparent border border-transparent"
      : "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700";

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-md ${sizeClasses} ${variantClasses} ${
            invalid ? "border-red-500" : ""
          } focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 disabled:opacity-60`}
        />

        {/* Clear button */}
        {clearable && value && !disabled && (
          <button
            type="button"
            onClick={() =>
              onChange?.({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-300"
          >
            ✕
          </button>
        )}

        {/* Password toggle */}
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-sm text-blue-500"
          >
            {showPassword ? <EyeClosed /> : <Eye />}
          </button>
        )}
      </div>

      {/* Error or Helper */}
      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;
