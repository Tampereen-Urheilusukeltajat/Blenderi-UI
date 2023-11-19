import React, { useCallback } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { ElementButton, ElementButtonProps } from '../Button/Buttons';
import styles from './CommonTable.module.scss';

type Row = Array<number | string | null>;

export type TableColumn = {
  title: string;
  shortTitle: string;
};

export type TableRow = {
  id: string;
  mainRow: Row;
  childRows?: Row[];
  formatter?: () => string;
};

type CommonTableProps = {
  columns: TableColumn[];
  rows: TableRow[];
  includeRowNumber?: boolean;
  includeEditButton?: boolean;
  includeDeleteButton?: boolean;
  onRowDelete?: (id: string) => void;
};

const ElementButtonCell: React.FC<ElementButtonProps> = ({
  onClick,
  element,
}): JSX.Element => {
  return (
    <td className={styles.noBackground}>
      <ElementButton element={element} onClick={onClick} />
    </td>
  );
};

/**
 * Common table element which can be used in a number of situations.
 * HOX Row length MUST ALWAYS match the length of columns! Otherwise,
 * the styling will break! Empty values can be indicated by using null
 */
export const CommonTable: React.FC<CommonTableProps> = ({
  columns,
  rows,
  includeDeleteButton = false,
  includeEditButton = false,
  includeRowNumber = false,
  onRowDelete,
}): JSX.Element => {
  const handleEditButtonClick = useCallback(() => {
    // TODO
  }, []);

  const handleDeleteButtonClick = useCallback(
    (id: string) => {
      onRowDelete?.(id);
    },
    [onRowDelete]
  );

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <div className={`${styles.content} .table-responsive`}>
      <table data-testid="common-table">
        <thead>
          <tr>
            {includeRowNumber ? (
              <th key="row-number" scope="col">
                #
              </th>
            ) : null}
            {columns.map((column) => (
              <th key={column.title} scope="col">
                <span className="long">{column.title}</span>
                <span className="short">{column.shortTitle}</span>
              </th>
            ))}
            {includeEditButton ? (
              <th key="modify" scope="col">
                Muokkaa
              </th>
            ) : null}
            {includeDeleteButton ? (
              <th key="delete" scope="col">
                Poista
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <React.Fragment key={`row-fragment-${index + 1}`}>
              <tr
                key={`row-${index + 1}`}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                {includeRowNumber ? (
                  <td key={`row-number-${index + 1}`} scope="row">
                    {index + 1}
                  </td>
                ) : null}

                {row.mainRow.map((value, valueIndex) => (
                  <td
                    key={`row-${index + 1}-${
                      columns[valueIndex].title
                    }-${String(value)}`}
                  >
                    {value}
                  </td>
                ))}

                {includeEditButton ? (
                  <ElementButtonCell
                    key={`row-${index + 1}-modify`}
                    element={<BsPencil />}
                    onClick={handleEditButtonClick}
                  />
                ) : null}
                {includeDeleteButton ? (
                  <ElementButtonCell
                    key={`row-${index + 1}-delete`}
                    element={<BsTrash className={styles.delete} />}
                    onClick={() => handleDeleteButtonClick(row.id)}
                  />
                ) : null}
              </tr>
              {/* Does the row have "child" rows  */}
              {row.childRows?.map((childRow, childRowIndex) => (
                <tr
                  key={`row-${index + 1}-child-row-${childRowIndex}`}
                  className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                >
                  {includeRowNumber ? (
                    <td
                      key={`row-number-${index + 1}-child-row-${childRowIndex}`}
                      scope="row"
                    >
                      {index + 1}.{childRowIndex + 1}
                    </td>
                  ) : null}
                  {childRow.map((value, valueIndex) => (
                    <td
                      key={`row-${index + 1}-child-row-${childRowIndex}-${
                        columns[valueIndex].title
                      }-${String(value)}`}
                    >
                      {value}
                    </td>
                  ))}
                  {includeEditButton ? (
                    <td
                      key={`row-${index + 1}-child-row-${childRowIndex}-edit`}
                    ></td>
                  ) : null}
                  {includeDeleteButton ? (
                    <td
                      key={`row-${index + 1}-child-row-${childRowIndex}-delete`}
                    ></td>
                  ) : null}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
