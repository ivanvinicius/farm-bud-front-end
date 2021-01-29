import React, { useMemo } from 'react';
import { Column, useTable, usePagination, useGlobalFilter } from 'react-table';

import GlobalInputFilter from './GlobalInputFilter';

import {
  Container,
  TableHeader,
  PaginationButtons,
  TableContent,
  TableFooter,
} from './styles';

interface ITableProps {
  data: Array<{}>;
  loadingData: boolean;
  columns: Column[];
  hideColumns?: Array<string>;
}

const Table: React.FC<ITableProps> = ({
  data,
  loadingData,
  columns,
  hideColumns,
}) => {
  const infoMessage = useMemo(() => {
    let message = '';

    loadingData
      ? (message = 'Carregando itens...')
      : (message = 'Nenhum item foi encontrado!');

    return message;
  }, [loadingData]);

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
    state: { pageIndex, globalFilter },
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

  return (
    <Container>
      <TableHeader>
        <GlobalInputFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />

        <PaginationButtons>
          <span>{`Página ${pageIndex + 1} de ${pageOptions.length}`}</span>

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
        </PaginationButtons>
      </TableHeader>

      <TableContent
        alignTextDataToCenter={page.length === 0}
        {...getTableProps()}
      >
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
          {(page.length > 0 &&
            page.map((row) => {
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
            })) || (
            <tr>
              <td colSpan={5}>{infoMessage}</td>
            </tr>
          )}
        </tbody>
      </TableContent>

      <TableFooter>
        <button type="button">Cadastrar</button>
        <button type="button">Alterar</button>
        <button type="button">Deletar</button>
      </TableFooter>
    </Container>
  );
};

export default Table;
