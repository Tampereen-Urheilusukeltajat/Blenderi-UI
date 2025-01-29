import styles from './CommonTable.module.scss';
import { flexRender, type Table } from '@tanstack/react-table';

type CommonTableProps<T> = {
  table: Table<T>;
  onRowDelete?: (id: string) => void;
};

/**
 * WIP Table commponent which uses Tanstack table in the background
 */
export const CommonTableV2 = <T,>({
  table,
}: CommonTableProps<T>): JSX.Element => {
  return (
    <div className={`${styles.content} table-responsive`}>
      <table data-testid="common-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
