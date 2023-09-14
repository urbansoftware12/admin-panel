import React, { useEffect, useState } from "react";
import Infotip from '@/components/tooltips/infotip'
import { SortUpIcon } from "@/public/icons/SortUpIcon";
import { SortDownIcon } from "@/public/icons/SortDownIcon";
import styled from "styled-components";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useRowSelect,
  useRowState
} from "react-table";

const Styled = styled.div`
  display: block;
  max-width: 100%;
  margin-top: 20px;

  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  table {
    width: 100%;
    border-spacing: 0;
    text-align: left;

    thead { 
      tr{ 
        th {
          padding: 17px 0 24px 0 ;
          :last-child {
            border-right: 0;
            float: right;
          }
          }
        }
      }

    tbody { 
      tr{ 
        td {
          margin: 0;
          padding: 18px 0 18px 0 ;
          &.collapse {
            width: 0.0000000001%;
          }

          :last-child {
            float: right;
          }
        }
      }
    }
  }
`

const GenericTable3 = (props) => {
  const { columns, data, query, selectedCategories, setSelectedCategories } = props;
  // const [slectedRows, setSlectedRows] = useState([])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, globalFilter: query },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            accessor: "id",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <>
                <input id="selectall" type="checkbox" {...getToggleAllRowsSelectedProps()} />
                <label htmlFor="selectall" className="select-none">ID</label>
              </>
            ),
            Cell: ({ row }) => {
              const value = row.original.id
              return <div className="group relative z-30 flex justify-start gap-x-2" >
                <input value={value} id={value} type="checkbox"
                  checked={row.isSelected}
                  onChange={(e) => {
                    const {checked} = e.target
                    row.toggleRowSelected();
                  }}
                />
                <label htmlFor={value} className='w-10 truncate cursor-pointer'>
                  {value}
                  <Infotip>{value}</Infotip>
                </label>
              </div>
            },
            disableSortBy: true,
          },
          ...columns,
        ];
      });
    }
  )

  return (
    <>
      <Styled>
        <div className="tableWrap pb-20">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(
                      column.getSortByToggleProps(),
                      { className: column.collapse ? 'collapse' : '' }
                    )}>
                      <span className="flex items-center gap-[5px] text-[15px] font-[400] text-black ">
                        {column.render("Header")}
                        <span>
                          {(() => {
                            if (!column.canSort) return
                            if (column.isSorted) {
                              if (column.isSortedDesc) return <SortUpIcon />
                              else return <SortDownIcon />
                            }
                            else return <span className="flex items-center">
                              <SortUpIcon /> <SortDownIcon />
                            </span>
                          })()}
                        </span>
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <tr className={`overflow-hidden ${i == 0 ? "" : props.border ? "border-t" : "border-t"}`}
                    {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td className="text-sm" {...cell.getCellProps({
                        className: cell.column.collapse ? 'collapse' : '',
                      })}>
                        {cell.render('Cell')}
                      </td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Styled>
    </>
  );
};

export default GenericTable3;