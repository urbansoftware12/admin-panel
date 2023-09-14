import { SortDownIcon } from "@/public/icons/SortDownIcon";
import { SortUpIcon } from "@/public/icons/SortUpIcon";
import React from "react";
// import Pagination from "@mui/material/Pagination";
import styled from "styled-components";
import {
  useTable,
  useBlockLayout,
  useSortBy,
  usePagination,
  useExpanded,
} from "react-table";

import { InputSelect } from "../InputSelect";
import { SearchIcon } from "@/public/sidebaricons/SearchIcon";
import Pagination from "./Pagination";

const Styled = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;
  margin-top: 20px;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    // border-bottom: 1px solid black;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;
    text-align: left;

    thead { 
      tr{ 
        th {
          padding: 17px 10px 24px 10px ;
          }
        }
      }


    tbody { 
      tr{ 
        :nth-child(odd){
          background-color: #f2f2f2;
        }
        td {
          // text-align: center;
          // align-items: center;
          margin: 0;
          padding: 18px 10px 18px 10px ;
          // border-bottom: 1px solid black;
          // border-right: 1px solid black;

          /* The secret sauce */
          /* Each cell should grow equally */
          // width: 1%;
          /* But "collapsed" cells should be as small as possible */
          &.collapse {
            width: 0.0000000001%;
          }

          :last-child {
            border-right: 0;
          }
        }
      }
    }
  }

 
`




const GenericTable2 = (props) => {
  const { columns, data } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
  )

  // const setGridTemplateColumns = (columns, i) => {
  //   let frs = ["1fr", "2fr", "1fr", "2fr", "1fr"];

  //   console.log("INDEX = ", i, subRowIndex);
  //   let makeString = "";
  //   columns.map((col, i) => {
  //     makeString = makeString + " auto ";
  //   });
  //   if (props.addActionColumn) makeString = makeString + " 1fr";
  //   if (i === subRowIndex)
  //     return { gridTemplateColumns: makeString, border: "5px solid red" };
  //   return { gridTemplateColumns: makeString };
  // };

  return (
    <>
     

  <Styled>
      <div className="tableWrap">
        <table {...getTableProps()}>
          <thead  >
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="border-b-[1px] border-[#DADADA] " >
                {headerGroup.headers.map(column => (
                  <th 
                    {...column.getHeaderProps(
                      column.getSortByToggleProps(),
                      {
                      className: column.collapse ? 'collapse' : '',
                    })}
                  >
                    <span className="flex items-center gap-[5px] text-[15px] font-[400] text-[#0000004a] ">
                    {column.render("Header")}
                    {/* <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <SortUpIcon />
                        ) : (
                          <SortDownIcon />
                        )
                      ) : (
                        <span className="flex items-center">
                          <SortUpIcon /> <SortDownIcon />
                        </span>
                      )}
                    </span> */}
                  </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody 
           {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr className={`  border-b-[1px] border-[#DADADA]  `}
                {...row.getRowProps()}  >
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps({
                          className: cell.column.collapse ? 'collapse' : '',
                        })}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      </div>
   
      {/* <div className="flex justify-between items-center" >
          <span className="flex text-[14px] font-[400] " >
            <p> Showing &nbsp; </p> 
            <p>
              {pageIndex + 1} to {pageSize + pageIndex} of {pageOptions.length }

            </p>
            <p> &nbsp; Entries </p> 
          </span>
          <Pagination canNextPage={canNextPage}
                    canPreviousPage={canPreviousPage}
                    gotoPage={gotoPage}
                    pageCount={pageCount}
                    nextPage={nextPage}
                    previousPage={previousPage}
        />
      </div> */}
      </Styled>
    </>
  );
};

export default GenericTable2;
