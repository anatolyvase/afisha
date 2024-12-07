import { EventDate } from "@/entities/event";
import { CalendarDays } from "lucide-react";

export function EventCardSchedule({ dates }: { dates: EventDate[] }) {
  const now = Date.now();

  const formatDate = (date: Date, isEnd?: boolean) => {
    if (isEnd && date.getHours() === 0 && date.getMinutes() === 0) {
      date.setDate(date.getDate() - 1);
    }
    const result =
      date.getHours() === 0 && date.getMinutes() === 0
        ? date.toLocaleDateString("RU", {
            month: "long",
            day: "numeric",
          })
        : date.toLocaleString("RU", {
            hour: "numeric",
            minute: "numeric",
            month: "long",
            day: "numeric",
          });

    if (isEnd) {
      return result.replace(" в ", " до ");
    }

    return result;
  };

  const formatSchedule = (schedule: { start: string; end: string }) => {
    const { start, end } = schedule;

    if (start === "0") return `до ${end}`;

    const [startDay, startMonth, , startTime] = start.split(" ");
    const [, endMonth, , endTime] = end.split(" ");

    if (start === end.replace(" до ", " в ")) return start;

    if (startMonth === endMonth && startTime !== endTime) {
      return startDay + " - " + end;
    }

    if (startMonth === endMonth && startTime && startTime !== endTime) {
      return `${startDay} ${startMonth} с ${startTime} до ${endTime}`;
    }

    return `${start} – ${end}`;
  };

  const getSchedule = () => {
    const hasYearRound = dates.some(
      ({ start, end }) =>
        start < 0 &&
        new Date(end! * 1000).getFullYear() - new Date().getFullYear() > 100,
    );

    dates.sort((a, b) => a.end - b.end);

    if (hasYearRound) return "Круглый год";

    const pastDates = dates
      .filter(({ start }) => start < 0)
      .sort((a, b) => a.end - b.end);

    if (
      pastDates.length &&
      pastDates.some(
        ({ start, end }) => start * 1000 > now || end! * 1000 > now,
      )
    ) {
      const lastEndDate = pastDates[pastDates.length - 1].end!;
      return [
        {
          start: "0",
          end: new Date(lastEndDate * 1000).toLocaleDateString("RU", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        },
      ];
    }

    return dates
      .filter(({ start, end }) => start * 1000 > now || end! * 1000 > now)
      .sort((a, b) => a.start - b.start)
      .map(({ start, end }) => ({
        start: formatDate(new Date(start * 1000)),
        end: formatDate(new Date(end! * 1000), true),
      }))
      .slice(0, 2);
  };

  const schedules = getSchedule();

  return (
    <div className="flex items-start gap-1">
      <CalendarDays className="min-w-[18px] min-h-[18px]" size="18px" />
      <ul className="flex flex-col font-bold text-sm">
        {typeof schedules === "string"
          ? schedules
          : schedules.map((schedule, index) => (
              <li key={index}>{formatSchedule(schedule)}</li>
            ))}
      </ul>
    </div>
  );
}
