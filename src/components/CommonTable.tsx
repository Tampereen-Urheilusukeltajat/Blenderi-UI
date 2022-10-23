import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';
import '../styles/commonTable/commonTable.css';

type Row = string[];

type CommonTableProps = {
  columns: string[];
  rows: Row[];
  includeRowNumber?: boolean;
  includeEditButton?: boolean;
  includeDeleteButton?: boolean;
};

const IconButtonCell = (props: {
  onClick: React.MouseEventHandler;
  icon: JSX.Element;
}): JSX.Element => {
  const { onClick, icon } = props;
  return (
    <td>
      <Button className="no-background btn-light" onClick={onClick}>
        {icon}
      </Button>
    </td>
  );
};

export const CommonTable = (props: CommonTableProps): JSX.Element => {
  const {
    columns,
    rows,
    includeDeleteButton = false,
    includeEditButton = false,
    includeRowNumber = false,
  } = props;

  const handleEditButtonClick = useCallback(() => {
    // TODO
  }, []);

  const handleDeleteButtonClick = useCallback(() => {
    // TODO
  }, []);

  return (
    <table className="table">
      <thead>
        {includeRowNumber ? <th scope="col">#</th> : null}
        {columns.map((column) => (
          <th scope="col">{column}</th>
        ))}
        {includeEditButton ? <th scope="col">Muokkaa</th> : null}
        {includeDeleteButton ? <th scope="col">Poista</th> : null}
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr>
            {includeRowNumber ? <th scope="row">{index + 1}</th> : null}
            {row.map((element) => (
              <td>{element}</td>
            ))}
            {includeEditButton ? (
              <IconButtonCell
                icon={<BsPencil />}
                onClick={handleEditButtonClick}
              />
            ) : null}
            {includeDeleteButton ? (
              <IconButtonCell
                icon={<BsTrash />}
                onClick={handleDeleteButtonClick}
              />
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
