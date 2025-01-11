"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnPinningState,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { options } from "./_components/MultiSelect";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import CSVExportModal from "./_components/CSVExportModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["select", "stageName"],
    right: [],
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnPinningChange: setColumnPinning,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      columnPinning,
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      columnOrder: [
        "select",
        "selectAndActions",
        "stageName",
        "showcase",
        "photo",
      ],
      columnPinning: {
        left: [],
        right: [],
      },
      pagination: {
        pageSize: 25,
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

  const showcaseData = table
    .getFilteredRowModel()
    .rows.map((row) => row.getValue("applicantResponse"));

  const showcaseDataWithOrder = showcaseData.map((obj, index) => ({
    ...obj,
    order: index + 1,
  }));

  // table.getAllColumns().forEach((column) => {
  //   const columnId = column.id; // Get column ID

  //   const selectedRows = table.getFilteredRowModel().rows.forEach((row) => {
  //     showcaseData.push(row.getValue(columnId));
  //   });

  // const columnId = column.id; // Get column ID
  // rowData[columnId] = selectedRows.getValue(columnId); // Get value for this column
  // });

  // const showcaseData = table.getAllColumns().forEach((column) => {
  //   table.getFilteredRowModel().rows.map((row) => row.getValue(column.id));
  // });
  // const rowData = {};

  // const showcaseData = table.getFilteredRowModel().rows.map((row) => {
  //   table.getAllColumns().forEach((column) => {
  //     rowData[column.id] = row.getValue(column.id);
  //   });
  // });

  // console.log("hi");

  // table.getFilteredRowModel().rows.map((row) => row.getValue("applicantResponse"))

  console.log("Filter Value", columnFilters);
  return (
    <div className="overflow-y-scroll overflow-x-scroll max-h-[80vh] rounded-md border border-black">
      {/* <div className="flex justify-between items-center"> */}
      <div className="flex items- py-4 px-4 gap-4 sticky left-0 top-0">
        <div className="flex flex-col">
          <Select
            onValueChange={(value) => {
              const selectedValue = value !== "All" ? value : undefined;
              table.getColumn("showcase")?.setFilterValue(selectedValue);
              table
                .getColumn("order")
                ?.toggleSorting(
                  table.getColumn("order")?.getIsSorted() === "asc"
                );
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Showcase" />
            </SelectTrigger>
            <SelectContent className="bg-[#FFF0F0] z-[100]">
              <SelectItem value={"All"}>All Performers</SelectItem>
              <Separator />
              {options.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {table.getFilteredRowModel().rows && (
            <div className="flex gap-2 pl-4 text-sm">
              <h1>{table.getFilteredRowModel().rows.length}</h1>
              <h1> results</h1>
            </div>
          )}
        </div>

        <Input
          placeholder="Search performer..."
          value={
            (table.getColumn("stageName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("stageName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex  flex-col items-center">
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>

          <h3 className="text-sm">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </h3>
        </div>
        <div className="flex-1 text-sm text-muted-foreground mx-10 items-start justify-center">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="">
          {columnFilters.length ? (
            <CSVExportModal
              data={
                showcaseDataWithOrder
                // table
                // .getFilteredRowModel()
                // .rows.map((row) => row.getValue("applicantResponse"))
              }
              fileName={table.getColumn("showcase")?.getFilterValue()}
            />
          ) : (
            <Button disabled={true}>Select a showcase to export</Button>
          )}
        </div>
      </div>

      <Table>
        <TableHeader
          className="sticky top-0 z-[50]"
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
