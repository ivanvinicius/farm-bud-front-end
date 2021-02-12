/* eslint @typescript-eslint/no-explicit-any: 0 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  Column,
  useTable,
  usePagination,
  useGlobalFilter,
  useRowSelect,
} from 'react-table';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import GlobalInputFilter from './GlobalInputFilter';
import IndeterminateInput from './IndeterminateInput';
import ActionButton from '../ActionButton';
import Modal from '../Modal';

import {
  Container,
  TableHeader,
  PaginationButtons,
  TableContent,
  TableFooter,
  ModalContent,
} from './styles';

interface ITableProps {
  data: Array<{}>;
  loadingData: boolean;
  columns: Column[];
  actions?: {
    create?: {
      url: string;
    };
    update?: {
      url: string;
    };
    delete?: {
      url: string;
      columnNameAccessor: string;
    };
    detail?: {
      url: string;
    };
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
  const [buttonCRUDisabled, setButtonCRUDisabled] = useState(true); // CRU means Create, Read and Update
  const [buttonDeleteDisabled, setButtonDeleteDisabled] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<Array<string>>([]);
  const history = useHistory();

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

  const handleToggleModal = useCallback(() => {
    setModalIsOpen((state) => !state);
  }, []);

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

  const modalMessage = useMemo(() => {
    let message = '';
    const { length } = Object.keys(selectedRowIds);

    length > 1
      ? (message = `Você tem certeza que deseja excluir os ${length} produtos selecionados?`)
      : (message = `Você tem certeza que deseja excluir o produto selecionado?`);

    return message;
  }, [selectedRowIds]);

  useMemo(() => {
    setButtonCRUDisabled(Object.keys(selectedRowIds).length !== 1);
  }, [selectedRowIds]);

  useMemo(() => {
    setButtonDeleteDisabled(Object.keys(selectedRowIds).length < 1);
  }, [selectedRowIds]);

  useMemo(() => {
    const columnAccessor = String(actions?.delete?.columnNameAccessor);

    const selectedRows: Array<string> = selectedFlatRows.map(
      (row: any) => row?.original[columnAccessor],
    );

    setItemsToDelete(selectedRows);
  }, [selectedFlatRows, actions]);

  const handleActionCreate = useCallback(() => {
    return history.push(`${actions?.create?.url}`, {
      item: selectedFlatRows[0]?.original,
    });
  }, [history, actions, selectedFlatRows]);

  const handleActionUpdate = useCallback(() => {
    return history.push(`${actions?.update?.url}`, {
      item: selectedFlatRows[0]?.original,
    });
  }, [history, actions, selectedFlatRows]);

  const handleActionDelete = useCallback(() => {
    try {
      const column = actions?.delete?.columnNameAccessor;

      if (column) {
        api.delete(`/products-measures`, { data: { ids: itemsToDelete } });

        // const dataFiltered = data.filter((item: any) => {
        //   return !itemsToDelete.includes(item[column]);
        // });

        toast.error('Terminar o método da forma correta.');
      }
    } catch (err) {
      toast.error('Ocorreu um erro durante a exclusão.');
    }

    handleToggleModal();
  }, [handleToggleModal, itemsToDelete, actions]);

  const handleActionDetail = useCallback(() => {
    alert('detail'); //eslint-disable-line
  }, []);

  return (
    <Container>
      <Modal isOpen={modalIsOpen} onRequestClose={handleToggleModal}>
        <ModalContent>
          <span>{modalMessage}</span>

          <div>
            <button type="button" onClick={() => handleActionDelete()}>
              Excluir
            </button>
            <button type="button" onClick={() => handleToggleModal()}>
              Cancelar
            </button>
          </div>
        </ModalContent>
      </Modal>

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
            disabled={buttonCRUDisabled}
            onClick={() => handleActionCreate()}
            actionType="create"
          />
        )}

        {actions?.update && (
          <ActionButton
            disabled={buttonCRUDisabled}
            onClick={() => handleActionUpdate()}
            actionType="update"
          />
        )}

        {actions?.delete && (
          <ActionButton
            disabled={buttonDeleteDisabled}
            onClick={() => handleToggleModal()}
            actionType="delete"
          />
        )}

        {actions?.detail && (
          <ActionButton
            disabled={buttonCRUDisabled}
            onClick={() => handleActionDetail()}
            actionType="detail"
          />
        )}
      </TableFooter>
    </Container>
  );
};

export default Table;
