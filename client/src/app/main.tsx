import "@/assets/index.css";
import { Providers } from "./providers";
import { HomePage } from "@/pages/home";
import { config } from "@/shared/config";
import { RootLayout } from "@/shared/ui/root-layout";
import { Header } from "@/widgets/header";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/msk" replace />} />
        <Route
          element={
            <RootLayout>
              <Header />
            </RootLayout>
          }>
          <Route path={config.routes.home} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Providers>,
);
