import { ThemeProvider } from "@/app/providers/theme-provider.tsx";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
