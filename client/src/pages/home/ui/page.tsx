import { useLocations } from "@/entities/location";
import { LocationSelect } from "@/features/change-location";
import { Heading } from "@/shared/ui/heading";
import { LoadingFallback } from "@/shared/ui/loading-fallback";
import { PageContainer } from "@/shared/ui/page-container";
import { EventList } from "@/widgets/event-list";
import { useNavigate, useParams } from "react-router";

export function HomePage() {
  const navigate = useNavigate();
  const { region } = useParams<{ region: string }>();
  const { locations, isLoading } = useLocations();

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!locations.find(i => i.slug === region)) {
    navigate("/msk");
    return;
  }

  return (
    <PageContainer
      heading={
        <Heading
          title={
            <div className="flex items-center gap-2">
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
