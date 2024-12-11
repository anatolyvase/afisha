import { useCurrentLocationStore } from "@/entities/location";
import { searchService } from "@/features/search-events/api";
import { ISearchEvent } from "@/features/search-events/model";
import { cn, uppercaseFirstLetter } from "@/shared/lib/utils.ts";
import { Button } from "@/shared/ui/button.tsx";
import { Input } from "@/shared/ui/input.tsx";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

export function EventsSearch() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ISearchEvent[] | undefined>();
  const location = useCurrentLocationStore(state => state.location);

  useEffect(() => {
    const search = async (query: string) => {
      if (query.length < 2) {
        setData(undefined);
        setCount(0);
        return;
      }

      setData(undefined);

      setLoading(true);
      try {
        const { data } = await searchService.search(query, location);
        setData(data.results);
        setCount(data.count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => search(value), 300);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative w-full">
      <Input
        startContent={<Search />}
        endContent={
          value && (
            <Button variant="ghost" size="icon" onClick={() => setValue("")}>
              <X />
            </Button>
          )
        }
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Поиск"
      />
      <SearchResults isLoading={loading} data={data} count={count} />
    </div>
  );
}

type SearchResultProps = {
  isLoading: boolean;
  data?: ISearchEvent[];
  count: number;
};

function SearchResults({ isLoading, data, count }: SearchResultProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(isLoading || !!data);
  }, [isLoading, data]);

  const handleLinkClick = () => {
    setIsVisible(false);
  };

  return (
    <div className={cn("hidden absolute top-9 z-10", isVisible && "block")}>
      <div className="max-h-[400px] w-[400px] p-4 bg-background top-2 flex flex-col gap-2 border border-border rounded-md overflow-y-auto absolute">
        {isLoading && "Поиск..."}
        {!isLoading && data?.length === 0 ? (
          <span>По ваше запросу ничего не найдено</span>
        ) : (
          <>
            {!!data &&
              data.map(item => (
                <NavLink
                  onClick={handleLinkClick}
                  className="underline"
                  to={`/events/${item.id}`}>
                  {uppercaseFirstLetter(item.title)}
                </NavLink>
              ))}
            {!!data && count > data.length && (
              <Button variant="link">Показать больше</Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
