import { Button } from './button';
import { type DataTableFacetedFilterProps } from './data-table-faceted-filter';
import { Input } from './input';
import { useDataTableSearchContext } from '@/context/table/search-context';
import { useDataTableContext } from '@/context/table/table-context';
import { cn } from '@/lib/utils';
import type { Table } from '@tanstack/react-table';
import { RefreshCwIcon, XIcon } from 'lucide-react';
import React from 'react';

type DataTableToolbarProps<TData, TValue = unknown> = {
  table: Table<TData>;
  hideSearchBar?: boolean;
  filterOptions?: DataTableFacetedFilterProps<TData, TValue>[];
};

export function DataTableToolbar<TData, TCreate>({
  table,
  hideSearchBar = false,
  filterOptions = [],
}: Readonly<DataTableToolbarProps<TData, TCreate>>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const {
    query: { refetch, data, isFetching },
  } = useDataTableContext();
  const { search, setSearch } = useDataTableSearchContext();

  const handleRefresh = () => {
    refetch();
  };

  const handleOnChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const trimmed = value.trim();

      // return if there are only whitespaces
      if (value !== '' && trimmed === '') {
        return;
      }

      /**
       * Return if there is no data for a given search, and the new input is
       * only adding to the search.
       */
      if (data?.results.length === 0 && trimmed.startsWith(search)) {
        return;
      }

      setSearch(value);
    },
    [data, search],
  );

  return (
    <div className='sc-flex sc-items-center sc-justify-between'>
      <div className='sc-flex sc-flex-1 sc-items-center sc-space-x-2'>
        {!hideSearchBar && (
          <Input
            placeholder='Filter'
            value={search}
            onChange={handleOnChange}
            className='sc-h-8 sc-w-[150px] lg:sc-w-[250px]'
          />
        )}

        {/* {filterOptions.map(({ title, column, options }) => (
          <DataTableFacetedFilter
            column={table.getColumn(columnId.toString())}
            title={title}
            options={options}
            key={columnId.toString()}
          />
        ))} */}

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='sc-h-8 sc-px-2 lg:sc-px-3'
          >
            Reset
            <XIcon className='sc-ml-2 sc-h-4 sc-w-4' />
          </Button>
        )}
      </div>
      <div className='flex items-center gap-2'>
        <Button
          size='icon'
          variant='ghost'
          type='button'
          className={cn('sc-flex sc-h-8 sc-flex-row')}
          onClick={handleRefresh}
        >
          <RefreshCwIcon
            className={cn('sc-h-4 sc-w-4', { 'sc-animate-spin': isFetching })}
          />
        </Button>
      </div>
    </div>
  );
}
