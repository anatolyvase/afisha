import { cn } from "@/shared/lib/utils.ts";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-2.5 animate-pulse bg-gray-200 rounded-lg dark:bg-gray-700 w-48",
        className,
      )}
    />
  );
}
