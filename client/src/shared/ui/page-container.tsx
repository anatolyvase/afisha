import { cn } from "@/shared/lib/utils.ts";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};
export function PageContainer({ children, className }: Props) {
  return (
    <main className={cn("w-full max-w-screen-2xl p-4 xl:p-8", className)}>
      {children}
    </main>
  );
}
