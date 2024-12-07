import { useCategories } from "@/entities/category";
import { Button } from "@/shared/ui/button.tsx";
import { Checkbox } from "@/shared/ui/checkbox.tsx";
import { DatePicker } from "@/shared/ui/date-picker.tsx";
import { Label } from "@/shared/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select.tsx";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

type FiltersProps = {
  totalCount: number;
  isLoading: boolean;
  onChange: (value: string) => void;
};

export function Filters({ totalCount, isLoading, onChange }: FiltersProps) {
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dates, setDates] = useState<DateRange | undefined>();
  const [isFree, setIsFree] = useState<CheckedState>(false);

  useEffect(() => {
    const handleChange = () => {
      const filterStr = [
        selectedCategory !== "all" && `categories=${selectedCategory}`,
        (dates && dates.from && `actual_since=${dates.from.toISOString()}`) ||
          `actual_since=${new Date().toISOString()}`,
        dates && dates.to && `actual_until=${dates.to.toISOString()}`,
        isFree && "is_free=true",
      ]
        .filter(Boolean)
        .join("&");

      onChange(filterStr ? `?${filterStr}` : "");
    };

    const timeout = setTimeout(handleChange, 300);
    return () => clearTimeout(timeout);
  }, [selectedCategory, dates, isFree]);

  const handleReset = () => {
    setSelectedCategory("all");
    setDates(undefined);
    setIsFree(false);
  };
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-2">
            <Label>Даты</Label>
            <DatePicker disabled={isLoading} date={dates} onChange={setDates} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Виды</Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={"categories-all"} value="all">
                  Все
                </SelectItem>
                {!isCategoriesLoading &&
                  categories.map(category => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox checked={isFree} onCheckedChange={setIsFree} id="is_free" />
          <label
            htmlFor="is_free"
            className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Бесплатные
          </label>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center w-full text-muted-foreground min-h-9">
        {isLoading ? "Поиск событий..." : `Найдено ${totalCount} событий`}
        {(selectedCategory !== "all" || dates || isFree) && (
          <Button disabled={isLoading} variant="link" onClick={handleReset}>
            Очистить фильтры
          </Button>
        )}
      </div>
    </div>
  );
}
