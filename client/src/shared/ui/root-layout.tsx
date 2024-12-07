import React from "react";
import { Outlet } from "react-router";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {children}
      <Outlet />
    </div>
  );
}
