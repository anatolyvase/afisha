import { IEvent } from "@/entities/event";
import { useSearch } from "@/features/search-events/hooks/use-search.ts";
import { Button } from "@/shared/ui/button.tsx";
import { Input } from "@/shared/ui/input.tsx";
import { Popover, PopoverContent } from "@/shared/ui/popover.tsx";
import { useEffect, useState } from "react";

export function EventsSearch() {
  const [value, setValue] = useState("");
  const [data, setData] = useState<IEvent[]>([]);
  const { search } = useSearch({
    onSuccess: data => {
      setData(data);
    },
  });

  useEffect(() => {
    const handler = () => {
      search(value);
    };

    const timeout = setTimeout(handler, 300);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative w-full">
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Поиск"
      />
      <Popover open={value.length > 1}>
        <PopoverContent className="max-h-[400px] top-9 flex flex-col gap-2 overflow-y-auto absolute">
          {data.length === 0 ? (
            <span>По ваше запросу ничего не найдено</span>
          ) : (
            <>
              {data.map(item => (
                <span>{item.title}</span>
              ))}
              <Button variant="link">Показать больше</Button>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
