import React, { useMemo } from 'react';
import {
  Column,
  useTable,
  usePagination,
  useGlobalFilter,
  useRowSelect,
} from 'react-table';

import GlobalInputFilter from './GlobalInputFilter';
import IndeterminateInput from './IndeterminateInput';

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
  actions: {
    create?: string;
    update?: string;
    delete?: string;
  };
}

const Table: React.FC<ITableProps> = ({
  data,
  loadingData,
  columns,
  hideColumns,
  actions,
}) => {
  const infoMessage = useMemo(() => {
    let message = '';

    loadingData
      ? (message = 'Carregando itens...')
      : (message = 'Nenhum item foi encontrado!');

    return message;
  }, [loadingData]);

  const calculateColspan = useMemo((): number => {
    let size = 0;

    if (!hideColumns) {
      size = columns.length + 1;
    } else {
      size = columns.length - hideColumns.length + 1;
    }

    return size;
  }, [columns, hideColumns]);

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
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((allColumns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateInput
                name=""
                {...getToggleAllPageRowsSelectedProps()}
              />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateInput
                name=""
                {...row.getToggleRowSelectedProps()}
              />
            </div>
          ),
        },
        ...allColumns,
      ]);
    },
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
              <td colSpan={calculateColspan}>{infoMessage}</td>
            </tr>
          )}
        </tbody>
      </TableContent>

      <TableFooter>
        {actions?.create && <button type="button">Cadastrar</button>}
        {actions?.update && <button type="button">Alterar</button>}
        {actions?.delete && <button type="button">Deletar</button>}
      </TableFooter>
    </Container>
  );
};

export default Table;
