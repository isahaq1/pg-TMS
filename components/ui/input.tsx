import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  isInvalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isValid, isInvalid, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full h-[48px] flex gap-[10px] py-[12px] px-[16px] rounded-[8px] opacity-100 text-[16px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 transition-colors",
          // Default border
          "border border-[#0000000D]",
          // Invalid state (red border)
          isInvalid && "border-red-500 focus:border-red-500",
          // Valid state (green border)
          isValid && "border-green-500 focus:border-green-500",
          // Focus state for default
          !isValid && !isInvalid && "focus:border-blue-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };