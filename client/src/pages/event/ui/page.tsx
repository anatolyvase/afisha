import { useEvent } from "@/entities/event";
import { EventImage } from "@/entities/event/model";
import { uppercaseFirstLetter } from "@/shared/lib/utils.ts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel.tsx";
import { Heading } from "@/shared/ui/heading.tsx";
import { Image } from "@/shared/ui/image.tsx";
import { LoadingFallback } from "@/shared/ui/loading-fallback.tsx";
import { PageContainer } from "@/shared/ui/page-container.tsx";
import { PageErrorFallback } from "@/shared/ui/page-error-fallback.tsx";
import { useParams } from "react-router";

export function EventPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return <PageErrorFallback />;

  const { data, isLoading, isError, status } = useEvent(id);

  if (isLoading) return <LoadingFallback />;

  if (isError || !data) return <PageErrorFallback status={status} />;

  return (
    <PageContainer
      heading={<Heading title={data && uppercaseFirstLetter(data.title)} />}>
      <div className="relative">
        <Image
          classNames={{
            container: "h-[548px] rounded-lg",
            image: "object-top",
          }}
          src={data.images[0].image}
          alt="Image"
        />
        <div className="absolute h-[120px] text-xl bottom-0 justify-between items-end flex p-8 text-white bg-gradient-to-b from-transparent to-black w-full"></div>
      </div>
      <div
        className="text-center pt-4 text-2xl"
        dangerouslySetInnerHTML={{
          __html: data.description,
        }}
      />
      <div
        className="flex flex-col gap-4 mt-4"
        dangerouslySetInnerHTML={{
          __html: data.body_text,
        }}
      />
    </PageContainer>
  );
}

export function EventImagesCarousel({ images }: { images: EventImage[] }) {
  const previewSliced = images.slice(1);

  if (previewSliced.length === 0) return null;

  return (
    <Carousel
      className="w-1/2"
      opts={{
        loop: true,
      }}>
      <CarouselContent>
        {previewSliced.map(({ image }, index) => (
          <CarouselItem key={index}>
            <Image
              classNames={{
                container:
                  "h-[500px] rounded-lg bg-gray-200/40 dark:bg-gray-700/40",
                image: "object-center object-contain",
              }}
              src={image}
              alt="Image"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16 rounded-lg" />
      <CarouselNext className="mr-16 rounded-lg" />
    </Carousel>
  );
}
