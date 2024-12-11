import { useCurrentLocationStore, useLocations } from "@/entities/location";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/shared/ui/select.tsx";
import { Skeleton } from "@/shared/ui/skeleton.tsx";
import { useNavigate } from "react-router";

export function LocationSelect() {
  const location = useCurrentLocationStore(state => state.location);

  const navigate = useNavigate();
  const { locations, isLoading } = useLocations();

  const onValueChange = (value: string) => {
    navigate(`/${value}`);
  };

  return isLoading ? (
    <Skeleton className="flex w-[200px] h-9 rounded-lg" />
  ) : (
    <Select value={location} onValueChange={onValueChange}>
      <SelectTrigger className="w-fit h-fit text-primary gap-1 p-0 border-none shadow-none">
        <span className="text-2xl lg:text-3xl text-primary font-bold">
          {locations.find(l => l.slug === location)?.name || "Москва"}
        </span>
      </SelectTrigger>
      <SelectContent>
        {locations.map(location => (
          <SelectItem key={location.slug} value={location.slug}>
            {location.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
