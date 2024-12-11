export function PageErrorFallback({ status }: { status?: number }) {
  const message: Record<number, string> = {
    404: "Данная страница не найдена",
    500: "Страница в данный момент не доступна. Попробуйте позже",
  };

  return (
    <div className="flex w-full flex-1 justify-center items-center">
      {status ? message[status] : message[500]}
    </div>
  );
}
