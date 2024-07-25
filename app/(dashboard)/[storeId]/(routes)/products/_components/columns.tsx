"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "상품명",
  },
  {
    accessorKey: "isFeatured",
    header: "인기상품",
  },
  {
    accessorKey: "isArchived",
    header: "아카이브",
  },
  {
    accessorKey: "price",
    header: "가격",
  },
  {
    accessorKey: "category",
    header: "카테고리",
  },
  {
    accessorKey: "size",
    header: "사이즈",
  },
  {
    accessorKey: "color",
    header: "색상",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="size-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
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
    cell: ({ row }) => <div>TODO: Cell Actions</div>,
  },
];
