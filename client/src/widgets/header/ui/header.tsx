import { useCurrentLocationStore } from "@/entities/location";
import { ModeToggle } from "@/features/change-theme";
import { EventsSearch } from "@/features/search-events";
import { Home } from "lucide-react";
import { NavLink } from "react-router";

export function Header() {
  const location = useCurrentLocationStore(state => state.location);

  return (
    <header className="flex w-full  min-h-[70px] border-b border-border justify-center items-center">
      <div className="flex md:grid md:grid-cols-[2fr_3fr_2fr] px-4 lg:px-8 py-2 items-center gap-4 w-full max-w-screen-2xl">
        <div className="hidden md:flex gap-4 items-center">
          <NavLink
            to={"/" + location}
            className="text-xl font-bold uppercase whitespace-nowrap">
            Городская афиша
          </NavLink>
        </div>
        <div className="flex md:hidden gap-4 items-center">
          <NavLink to={"/" + location} className="text-xl font-bold uppercase">
            <Home />
          </NavLink>
        </div>
        <EventsSearch />
        <div className="flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
