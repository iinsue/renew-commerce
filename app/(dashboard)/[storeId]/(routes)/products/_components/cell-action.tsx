"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Edit, MoreHorizontal } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn } from "./columns";

type Props = {
  data: ProductColumn;
};

export const CellActionComponent = ({ data }: Props) => {
  const router = useRouter();
  const params = useParams();

  const onEditClick = () => {
    router.push(`/${params.storeId}/products/${data.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem onClick={onEditClick}>
            <Edit className="mr-2 size-4" />
            상품 수정
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
