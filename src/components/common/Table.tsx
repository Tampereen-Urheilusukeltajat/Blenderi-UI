import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';
import '../../styles/commonTable/commonTable.css';

type Row = Array<number | string | null>;

export type TableColumn = {
  title: string;
};

export type TableRow = {
  mainRow: Row;
  childRows?: Row[];
};

type CommonTableProps = {
  columns: TableColumn[];
  rows: TableRow[];
  includeRowNumber?: boolean;
  includeEditButton?: boolean;
  includeDeleteButton?: boolean;
};

type IconButtonCellProps = {
  onClick: React.MouseEventHandler;
  icon: JSX.Element;
};

const IconButtonCell: React.FC<IconButtonCellProps> = ({
  onClick,
  icon,
}): JSX.Element => {
  return (
    <td>
      <Button className="no-background btn-light" onClick={onClick}>
        {icon}
      </Button>
    </td>
  );
};

/**
 * Common table element, which can be used in number of situations.
 * HOX Row length MUST ALAWYS match the length of columns! Otherwise
 * the styling will break! Empty values can be indicated by using null
 */
export const CommonTable: React.FC<CommonTableProps> = ({
  columns,
  rows,
  includeDeleteButton = false,
  includeEditButton = false,
  includeRowNumber = false,
}): JSX.Element => {
  const handleEditButtonClick = useCallback(() => {
    // TODO
  }, []);

  const handleDeleteButtonClick = useCallback(() => {
    // TODO
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          {includeRowNumber ? (
            <th key="row-number" scope="col">
              #
            </th>
          ) : null}
          {columns.map((column) => (
            <th key={column.title} scope="col">
              {column.title}
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
            <tr key={`row-${index + 1}`}>
              {includeRowNumber ? (
                <td key={`row-number-${index + 1}`} scope="row">
                  {index + 1}
                </td>
              ) : null}

              {row.mainRow.map((value, valueIndex) => (
                <td
                  key={`row-${index + 1}-${columns[valueIndex].title}-${String(
                    value
                  )}`}
                >
                  {value}
                </td>
              ))}

              {includeEditButton ? (
                <IconButtonCell
                  key={`row-${index + 1}-modify`}
                  icon={<BsPencil />}
                  onClick={handleEditButtonClick}
                />
              ) : null}
              {includeDeleteButton ? (
                <IconButtonCell
                  key={`row-${index + 1}-delete`}
                  icon={<BsTrash />}
                  onClick={handleDeleteButtonClick}
                />
              ) : null}
            </tr>
            {row.childRows?.map((childRow, childRowIndex) => (
              <tr key={`row-${index + 1}-child-row-${childRowIndex}`}>
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
  );
};
