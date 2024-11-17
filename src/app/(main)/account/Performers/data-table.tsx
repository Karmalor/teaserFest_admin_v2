"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnPinningState,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["selectAndActions", "stageName"],
    right: [],
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnPinningChange: setColumnPinning,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    state: {
      columnPinning,
      sorting,
    },
    initialState: {
      columnOrder: ["selectAndActions", "stageName", "showcase", "photo"],
      columnPinning: {
        left: [],
        right: [],
      },
    },
  });

  const getCommonPinningStyles = (column: any): React.CSSProperties => {
    const isPinned = column.getIsPinned();
    const isLastLeftPinnedColumn =
      isPinned === "left" && column.getIsLastColumn("left");
    const isFirstRightPinnedColumn =
      isPinned === "right" && column.getIsFirstColumn("right");

    return {
      boxShadow: isLastLeftPinnedColumn
        ? "-4px 0 4px -4px gray inset"
        : isFirstRightPinnedColumn
        ? "4px 0 4px -4px gray inset"
        : undefined,
      left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
      opacity: isPinned ? 0.95 : 1,
      position: isPinned ? "sticky" : "relative",
      // width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
      // backgroundColor: "#fff",
    };
  };

  return (
    <div className="overflow-y-scroll overflow-x-scroll h-screen rounded-md border border-black">
      <Table>
        <TableHeader
          className="sticky top-0 z-[100]"
          // style={{
          //   position: "sticky",
          //   top: "24px",
          //   zIndex: "100",
          // }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const { column, rowSpan } = header;

                return (
                  <TableHead
                    key={header.id}
                    // className="sticky top-0 z-[100]"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      ...getCommonPinningStyles(column),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        {/* <ScrollArea className=""> */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell;

                  return (
                    <TableCell
                      key={cell.id}
                      style={{
                        backgroundColor: "#FFF0F0",
                        ...getCommonPinningStyles(column),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {/* </ScrollArea> */}
      </Table>
    </div>
  );
}
