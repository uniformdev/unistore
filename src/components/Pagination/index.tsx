import React, { useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { DOTS, usePagination } from '@/hooks/usePagination';
import ActionButton from '@/atoms/ActionButton';
import { Themes } from '@/utils/navUtils';
import TogglePageButton, { ArrowPosition } from '@/atoms/TogglePageButton';

type Props = {
  onPageChange(pageNumber: number): void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

const Pagination: React.FC<Props> = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }) => {
  const { forcedTheme } = useTheme();
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const lastPage = useMemo(() => paginationRange[paginationRange.length - 1], [paginationRange]);

  const onPrevious = useCallback(() => {
    onPageChange(currentPage - 1);
  }, [currentPage]);

  const onNext = useCallback(() => {
    onPageChange(currentPage + 1);
  }, [currentPage]);

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <div className="flex justify-between items-center w-full lg:min-h-0 min-h-[190px]">
      <TogglePageButton
        onChange={onPrevious}
        text="previous page"
        imgSrc={forcedTheme === Themes.dark ? '/img/left-arrow-white.svg' : '/img/left-arrow.svg'}
        className={currentPage === 1 ? 'opacity-25 pointer-events-none' : ''}
      />
      <div className="hidden md:flex">
        {paginationRange.map((pageNumber: string | number, idx) => {
          if (pageNumber === DOTS) {
            const key = `${idx}-dots`;
            return (
              <div key={key} className="border-none dark:text-white group items-center flex">
                <span>{DOTS}</span>
              </div>
            );
          }

          return (
            <ActionButton
              key={pageNumber}
              className={`${
                pageNumber === currentPage ? 'border-demo_border' : 'border-none'
              } w-[50px] dark:text-white dark:hover:text-havelock_blue hover:text-havelock_blue`}
              onClick={() => onPageChange(Number(pageNumber))}
            >
              <span>{pageNumber}</span>
            </ActionButton>
          );
        })}
      </div>
      <div className="md:hidden border-none dark:text-white">
        <span>{currentPage}</span>
      </div>
      <TogglePageButton
        onChange={onNext}
        text="next page"
        imgSrc={forcedTheme === Themes.dark ? '/img/right-arrow-white.svg' : '/img/right-arrow.svg'}
        className={currentPage === lastPage ? 'opacity-25 pointer-events-none' : ''}
        positionArrow={ArrowPosition.RIGHT}
      />
    </div>
  );
};

export default Pagination;
