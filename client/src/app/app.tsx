import { Providers } from "@/app/providers";
import { useCurrentLocationStore } from "@/entities/location";
import { EventPage } from "@/pages/event";
import { HomePage } from "@/pages/home";
import { RootLayout } from "@/shared/ui/root-layout.tsx";
import { Header } from "@/widgets/header";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

function App() {
  const location = useCurrentLocationStore(state => state.location);
  const initializeLocation = useCurrentLocationStore(
    state => state.initializeLocation,
  );

  useEffect(() => {
    initializeLocation();
  }, []);

  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={`/${location}`} replace />} />
          <Route
            element={
              <RootLayout>
                <Header />
              </RootLayout>
            }>
            <Route path="/:region" element={<HomePage />} />
            <Route path="/events/:id" element={<EventPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
