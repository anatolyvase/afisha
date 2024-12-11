import * as React from "react";

import { cn } from "@/shared/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, startContent, endContent, type, ...props }, ref) => {
    return (
      <div className="flex rounded-md w-full items-center justify-between border border-input bg-transparent focus-within:ring-1 focus-within:ring-ring">
        <div className="text-muted-foreground px-3">{startContent}</div>
        <input
          type={type}
          className={cn(
            "flex h-9 w-full bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
          ref={ref}
          {...props}
        />
        <div className="text-muted-foreground">{endContent}</div>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
