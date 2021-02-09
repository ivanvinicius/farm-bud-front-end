import React, { useState, useMemo, useCallback } from 'react';
import {
  Column,
  useTable,
  usePagination,
  useGlobalFilter,
  useRowSelect,
} from 'react-table';
import { useHistory } from 'react-router-dom';

import GlobalInputFilter from './GlobalInputFilter';
import IndeterminateInput from './IndeterminateInput';
import ActionButton from '../ActionButton';

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
  actions: {
    create?: string;
    update?: string;
    delete?: string;
    detail?: string;
  };
  hideColumns?: Array<string>;
}

const Table: React.FC<ITableProps> = ({
  data,
  loadingData,
  columns,
  hideColumns,
  actions,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const history = useHistory();

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
    selectedFlatRows,
    state: { pageIndex, globalFilter, selectedRowIds },
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

  useMemo(() => {
    setButtonDisabled(Object.keys(selectedRowIds).length > 1);
  }, [selectedRowIds]);

  const handleActionCreate = useCallback(() => {
    return history.push(`${actions.create}`, {
      product: selectedFlatRows[0]?.original,
    });
  }, [history, actions, selectedFlatRows]);

  const handleActionUpdate = useCallback(() => {
    alert('update'); //eslint-disable-line
  }, []);

  const handleActionDelete = useCallback(() => {
    alert('delete'); //eslint-disable-line
  }, []);

  const handleActionDetail = useCallback(() => {
    alert('detail'); //eslint-disable-line
  }, []);

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
        {actions?.create && (
          <ActionButton
            disabled={buttonDisabled}
            onClick={() => handleActionCreate()}
            actionType="create"
          />
        )}

        {actions?.update && (
          <ActionButton
            disabled={buttonDisabled}
            onClick={() => handleActionUpdate()}
            actionType="update"
          />
        )}

        {actions?.delete && (
          <ActionButton
            onClick={() => handleActionDelete()}
            actionType="delete"
          />
        )}

        {actions?.detail && (
          <ActionButton
            disabled={buttonDisabled}
            onClick={() => handleActionDetail()}
            actionType="detail"
          />
        )}
      </TableFooter>
    </Container>
  );
};

export default Table;
