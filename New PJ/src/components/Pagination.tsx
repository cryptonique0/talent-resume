'use client';

import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
  maxVisible?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showFirstLast = true,
  maxVisible = 7,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible range
      let start = Math.max(2, currentPage - Math.floor(maxVisible / 2) + 1);
      let end = Math.min(totalPages - 1, start + maxVisible - 3);

      // Adjust start if we're near the end
      if (end === totalPages - 1) {
        start = Math.max(2, end - maxVisible + 3);
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...');
      }

      // Add visible page numbers
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const buttonBaseStyles =
    'px-3 py-2 rounded-md font-medium transition-colors min-w-[40px] flex items-center justify-center';
  const activeStyles = 'bg-blue-600 text-white';
  const inactiveStyles = 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300';
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <nav className={`flex items-center gap-2 ${className}`}>
      {/* First page button */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`${buttonBaseStyles} ${
            currentPage === 1 ? disabledStyles : inactiveStyles
          }`}
          aria-label="First page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonBaseStyles} ${
          currentPage === 1 ? disabledStyles : inactiveStyles
        }`}
        aria-label="Previous page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <motion.button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`${buttonBaseStyles} ${
              isActive ? activeStyles : inactiveStyles
            } relative`}
            whileHover={!isActive ? { scale: 1.05 } : {}}
            whileTap={!isActive ? { scale: 0.95 } : {}}
          >
            {pageNum}
          </motion.button>
        );
      })}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonBaseStyles} ${
          currentPage === totalPages ? disabledStyles : inactiveStyles
        }`}
        aria-label="Next page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Last page button */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`${buttonBaseStyles} ${
            currentPage === totalPages ? disabledStyles : inactiveStyles
          }`}
          aria-label="Last page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </nav>
  );
}

interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

export function PaginationInfo({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  className = '',
}: PaginationInfoProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <p className={`text-sm text-gray-600 ${className}`}>
      Showing <span className="font-medium">{startItem}</span> to{' '}
      <span className="font-medium">{endItem}</span> of{' '}
      <span className="font-medium">{totalItems}</span> results
    </p>
  );
}
