"use client";

import { ColumnDef } from "@tanstack/react-table";

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
];
