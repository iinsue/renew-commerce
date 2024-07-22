"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellActionComponent } from "./cell-actions";

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "billboardLabel", header: "Billboard" },
  { accessorKey: "createdAt", header: "Date" },
  {
    id: "actions",
    cell: ({ row }) => <CellActionComponent data={row.original} />,
  },
];
