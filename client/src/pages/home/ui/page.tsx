import { useCurrentLocationStore, useLocations } from "@/entities/location";
import { LocationSelect } from "@/features/change-location";
import { Heading } from "@/shared/ui/heading";
import { LoadingFallback } from "@/shared/ui/loading-fallback";
import { PageContainer } from "@/shared/ui/page-container";
import { PageErrorFallback } from "@/shared/ui/page-error-fallback.tsx";
import { EventList } from "@/widgets/event-list";
import { useNavigate, useParams } from "react-router";

export function HomePage() {
  const navigate = useNavigate();

  const location = useCurrentLocationStore(state => state.location);
  const setLocation = useCurrentLocationStore(state => state.setLocation);

  const { region } = useParams<{ region: string }>();
  const { locations, isLoading, isError } = useLocations();

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (isError) {
    return <PageErrorFallback />;
  }

  if (!locations.find(i => i.slug === region)) {
    navigate(`/${location}`);
    return;
  }

  if (region && locations.find(i => i.slug === region)?.slug !== location) {
    setLocation(region);
    return;
  }

  return (
    <PageContainer
      heading={
        <Heading
          title={
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2 whitespace-nowrap">
              Афиша города <LocationSelect />
            </div>
          }
        />
      }
      className="min-h-full">
      <EventList />
    </PageContainer>
  );
}
