"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellActionComponent } from "./cell-action";

export type BillboardColumns = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumns>[] = [
  {
    accessorKey: "label",
    header: "이름",
  },
  {
    accessorKey: "createdAt",
    header: "생성일",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionComponent data={row.original} />,
  },
];
