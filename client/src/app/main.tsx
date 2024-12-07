import "@/assets/index.css";
import { HomePage } from "@/pages/home";
import { config } from "@/shared/config";
import { RootLayout } from "@/shared/ui/root-layout";
import { Navbar } from "@/widgets/navbar";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route
        element={
          <RootLayout>
            <Navbar />
          </RootLayout>
        }>
        <Route path={config.routes.home} element={<HomePage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
