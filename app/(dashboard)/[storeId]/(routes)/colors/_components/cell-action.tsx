"use client";

import { useParams, useRouter } from "next/navigation";
import { ColorColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Props = {
  data: ColorColumn;
};

export const CellAction: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  // 색상수정 클릭 시 수정 페이지로 이동
  const onEditClick = () => {
    router.push(`/${params.storeId}/colors/${data.id}`);
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
            색상수정
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
