"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "색상이름",
  },
  {
    accessorKey: "value",
    header: "색상코드",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <div className="uppercase">{row.original.value}</div>
        <div
          className="size-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "등록일",
  },
  {
    id: "actions",
    cell: ({ row }) => <div>TODO: Cell Action</div>,
  },
];
