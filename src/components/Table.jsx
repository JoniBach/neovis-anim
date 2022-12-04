import {
  ArrowDropDown,
  ArrowDropUp,
  ArrowLeft,
  DoubleArrow,
  FastForward,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@styled-icons/material";
import { useState } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import { Input } from "./Input";

export const Table = ({ columns, data, onClick, paginate }) => {
  const [sorting, setSorting] = useState([]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const rowData = paginate ? page : rows;

  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDropDown size={25} />
                      ) : (
                        <ArrowDropUp size={25} />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rowData.map((row) => {
            prepareRow(row);
            return (
              <tr onClick={() => onClick(row.original)} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {paginate && (
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <FirstPage size={20} />
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <KeyboardArrowLeft size={20} />
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <KeyboardArrowRight size={20} />
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <LastPage size={20} />
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            <Input
              label="Go to page"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
