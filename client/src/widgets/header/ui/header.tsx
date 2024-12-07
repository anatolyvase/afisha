import { ModeToggle } from "@/features/change-theme";
import { Input } from "@/shared/ui/input.tsx";

export function Header() {
  return (
    <header className="flex w-full  min-h-[70px] border-b border-border justify-center items-center">
      <div className="grid grid-cols-[2fr_3fr_2fr] px-8 py-2 items-center gap-4 w-full max-w-screen-2xl">
        <div className="flex gap-4 items-center">
          <h2 className="text-xl font-bold uppercase">Городская афиша</h2>
        </div>
        <Input className="" placeholder="Поиск" />
        <div className="flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
