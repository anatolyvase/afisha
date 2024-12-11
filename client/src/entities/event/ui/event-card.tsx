import { Button } from "@/shared/ui/button.tsx";
import { Image } from "@/shared/ui/image.tsx";
import { MapPin, RussianRuble } from "lucide-react";
import { NavLink } from "react-router";
import { EventCardSchedule } from "./event-card-schedule.tsx";
import { IEvent } from "../model";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export function EventCard(props: IEvent & { href: string }) {
  const truncateDescription = (description: string) => {
    if (description.length > 120) {
      return description.substring(0, 120) + "...";
    }
    return description;
  };
  const uppercaseFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Card className="flex flex-col min-h-[350px] h-fit gap-4 overflow-hidden">
      <NavLink to={props.href}>
        <Image
          classNames={{ container: "h-[350px]" }}
          src={props.images[0].image}
          alt={props.title}
        />
      </NavLink>
      <CardHeader className="py-0 px-4 flex-1">
        <CardTitle>
          <NavLink className="hover:underline" to={props.href}>
            {uppercaseFirstLetter(props.title)}
          </NavLink>
        </CardTitle>
        <CardDescription>
          {truncateDescription(props.description)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2 text-sm items-start p-0 pb-4 px-4">
        <EventCardSchedule dates={props.dates} />
        {props.place && (
          <div className="flex items-start font-bold gap-1">
            <MapPin className="min-w-[18px] min-h-[18px]" size="18px" />
            {uppercaseFirstLetter(props.place.title)}
          </div>
        )}
        <div className="flex items-start font-bold gap-1">
          <RussianRuble className="min-w-[18px] min-h-[18px]" size="18px" />
          {props.is_free
            ? "Бесплатно"
            : props.price
              ? props.price
              : "уточняйте на сайте"}
        </div>
        <div className="flex items-center w-full justify-between mt-4">
          <Button asChild>
            <NavLink to={props.href}>Подробности</NavLink>
          </Button>
          <span className="font-bold">
            {props.age_restriction !== 0 && props.age_restriction}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
