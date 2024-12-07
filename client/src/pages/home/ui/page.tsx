import { PageContainer } from "@/shared/ui/page-container";
import { EventList } from "@/widgets/event-list";

export function HomePage() {
  return (
    <PageContainer className="min-h-full">
      <EventList />
    </PageContainer>
  );
}
