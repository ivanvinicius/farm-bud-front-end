import React, { useMemo } from 'react';
import { Column, useTable, usePagination, useGlobalFilter } from 'react-table';

import GlobalInputFilter from './GlobalInputFilter';

import { TableContainer } from './styles';

interface ITableProps {
  data: Array<{}>;
  columns: Column[];
  hideColumns?: Array<string>;
  useFilter?: boolean;
}

const Table: React.FC<ITableProps> = ({
  data,
  columns,
  hideColumns,
  useFilter = false,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex, selectedRowIds, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: hideColumns || [],
      },
    },
    useGlobalFilter,
    usePagination,
  );

  const countTableItems = useMemo(() => data.length, [data]);

  const countItemsSelected = useMemo(() => {
    return selectedRowIds ? selectedRowIds.length : 0;
  }, [selectedRowIds]);

  return (
    <>
      {useFilter && (
        <GlobalInputFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}

      <div>
        <button
          type="button"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>

        <button
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>

        <button
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>

        <button
          type="button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>
      </div>

      <TableContainer {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </TableContainer>

      <div>
        <span>{`Page ${pageIndex + 1} of ${pageOptions.length}`}</span>
        <br />
        <span>{`${countTableItems} items`}</span>
        <br />
        <span>{`${countItemsSelected} items selected`}</span>
      </div>
    </>
  );
};

export default Table;
