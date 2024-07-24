"use client";

import { SizeColumn } from "./columns";
import { useParams, useRouter } from "next/navigation";
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
  data: SizeColumn;
};

export const CellAction: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const onUpdateClick = () => {
    router.push(`/${params.storeId}/sizes/${data.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem onClick={onUpdateClick}>
            <Edit className="mr-2 size-4" />
            사이즈 수정
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
