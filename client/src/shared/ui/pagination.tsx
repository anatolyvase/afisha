import { Button } from "@/shared/ui/button.tsx";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}) {
  const generatePages = () => {
    const pages = [];
    const neighbors = 3;

    pages.push(1);

    if (currentPage > neighbors + 2) {
      pages.push(<Ellipsis />);
    }

    for (
      let i = Math.max(2, currentPage - neighbors);
      i <= Math.min(totalPages - 1, currentPage + neighbors);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - neighbors - 1) {
      pages.push(<Ellipsis />);
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex w-full items-center mt-4 gap-2 justify-center">
      <Button
        size="icon"
        disabled={currentPage === 1 || isLoading}
        onClick={prevPage}>
        <ChevronLeft />
      </Button>
      {generatePages().map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "ghost"}
            disabled={isLoading}
            onClick={() => onPageChange(page)}
            size="icon">
            {page}
          </Button>
        ) : (
          <span key={index} className="text-gray-500 px-2">
            {page}
          </span>
        ),
      )}
      <Button
        size="icon"
        disabled={totalPages <= currentPage || isLoading}
        onClick={nextPage}>
        <ChevronRight />
      </Button>
    </div>
  );
}
