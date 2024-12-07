import { cn } from "@/shared/lib/utils.ts";
import React from "react";

type Props = {
  heading: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};
export function PageContainer({ heading, children, className }: Props) {
  return (
    <main className={cn("flex flex-col w-full items-center", className)}>
      {heading}
      <div className="flex p-4 xl:p-8 flex-col w-full max-w-screen-2xl">
        {children}
      </div>
    </main>
  );
}
