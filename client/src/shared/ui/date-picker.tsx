import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select.tsx";
import { addDays, addMonths, format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { ru } from "date-fns/locale";

import { cn } from "@/shared/lib/utils";
import { DateRange } from "react-day-picker";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function DatePicker({
  date,
  disabled,
  onChange,
}: {
  date?: DateRange;
  disabled: boolean;
  onChange: (date?: DateRange) => void;
}) {
  const now = new Date();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}>
          <CalendarDays className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd LLL, y", {
                  locale: ru,
                })}{" "}
                -{" "}
                {format(date.to, "dd LLL, y", {
                  locale: ru,
                })}
              </>
            ) : (
              format(date.from, "dd LLL, y", {
                locale: ru,
              })
            )
          ) : (
            <span>Выбор даты</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Select
          onValueChange={value => {
            if (value === "month") {
              onChange({
                from: new Date(now.getFullYear(), now.getMonth(), 1),
                to: addDays(
                  new Date(now.getFullYear(), now.getMonth() + 1, 1),
                  -1,
                ),
              });
              return;
            }

            if (value === "nextMonth") {
              onChange({
                from: new Date(now.getFullYear(), now.getMonth() + 1, 1),
                to: addDays(
                  new Date(now.getFullYear(), now.getMonth() + 2, 1),
                  -1,
                ),
              });
              return;
            }

            onChange({
              from: addDays(new Date(), parseInt(value)),
            });
          }}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Сегодня</SelectItem>
            <SelectItem value="1">Завтра</SelectItem>
            <SelectItem value="month">
              {format(now, "LLLL", {
                locale: ru,
              })}
            </SelectItem>
            <SelectItem value="nextMonth">
              {format(addMonths(now, +1), "LLLL", {
                locale: ru,
              })}
            </SelectItem>
          </SelectContent>
        </Select>
        <Calendar
          mode="range"
          disabled={disabled}
          fromDate={new Date()}
          selected={date}
          locale={ru}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}
