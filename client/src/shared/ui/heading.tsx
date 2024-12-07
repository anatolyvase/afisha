import React from "react";

export function Heading({ title }: { title: React.ReactNode }) {
  return (
    <header className="flex justify-center py-4 min-w-full xl:py-8 border-b border-border text-3xl">
      <div className="w-full max-w-screen-2xl px-4 xl:px-8">{title}</div>
    </header>
  );
}
