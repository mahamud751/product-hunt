import React from "react";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex gap-5 justify-between items-center px-4 py-2 text-sm max-w-[960px] text-stone-500 max-sm:flex-wrap max-sm:gap-4 max-sm:justify-center"
      aria-label="Pagination"
    >
      <NavigationButton
        direction="prev"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      />
      <div className="flex gap-2 items-center">
        <span>Page:</span>
        {pageNumbers.map((pageNumber) => (
          <PaginationButton
            key={pageNumber}
            pageNumber={pageNumber}
            isActive={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          />
        ))}
      </div>
      <NavigationButton
        direction="next"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      />
    </nav>
  );
};

// PaginationButton Component
interface PaginationButtonProps {
  pageNumber: number;
  isActive: boolean;
  onClick: () => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  pageNumber,
  isActive,
  onClick,
}) => {
  return (
    <button
      className={`px-2 py-0 h-7 rounded-sm transition-all cursor-pointer duration-[0.2s] ease-[ease] min-w-[28px] ${
        isActive ? "bg-blue-500 text-white" : ""
      }`}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      {pageNumber}
    </button>
  );
};

// NavigationButton Component
interface NavigationButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  onClick,
}) => {
  const isNext = direction === "next";
  return (
    <button
      className="flex gap-2 items-center transition-all cursor-pointer duration-[0.2s] ease-[ease] text-stone-500"
      onClick={onClick}
      aria-label={isNext ? "Next page" : "Previous page"}
    >
      {!isNext && (
        <i className="ti ti-chevron-left text-xl" aria-hidden="true" />
      )}
      <span>{isNext ? "next" : "prev"}</span>
      {isNext && (
        <i className="ti ti-chevron-right text-xl" aria-hidden="true" />
      )}
    </button>
  );
};

export default PaginationComponent;
