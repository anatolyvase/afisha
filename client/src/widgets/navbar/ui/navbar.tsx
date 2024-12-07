import { Input } from "@/shared/ui/input.tsx";

export function Navbar() {
  return (
    <header className="flex w-full min-h-[70px] border-b border-b-gray-200 justify-center items-center">
      <div className="grid grid-cols-[1fr_2fr_1fr] px-8 py-2 items-center gap-4 w-full max-w-screen-2xl">
        <div className="flex gap-2">
          <h2 className="text-xl font-bold uppercase">My site logo</h2>
          <select className="rounded-md border border-gray-200">
            <option>en</option>
            <option>ru</option>
          </select>
        </div>
        <Input className="" placeholder="Поиск" />
        <div className="flex justify-end">theme</div>
      </div>
    </header>
  );
}
