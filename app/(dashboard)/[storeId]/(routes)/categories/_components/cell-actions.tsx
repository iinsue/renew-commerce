"use client";

import axios from "axios";

import { CategoryColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";
import { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

type Props = {
  data: CategoryColumn;
};

export const CellActionComponent: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeletePending, startDeleteTransition] = useTransition();

  // 클립보드에 카테고리 아이디 복사
  const onCopyClick = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("클립보드에 복사되었습니다.", {
      id: "copy-to-clipboard",
    });
  };

  // 카테고리 삭제
  const onDeleteConfirm = () => {
    startDeleteTransition(async () => {
      try {
        await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
        router.refresh();
        toast.success("삭제되었습니다.", { id: "delete-category" });
      } catch (error) {
        console.log("카테고리의 물품이 모두 삭제되었는지 확인하세요.");
      } finally {
        setIsOpen(false);
      }
    });
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDeleteConfirm}
        loading={isDeletePending}
      />
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
          <DropdownMenuItem onClick={() => onCopyClick(data.id)}>
            <Copy className="mr-2 size-4" />
            아이디 복사
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/categories/${data.id}`)
            }
          >
            <Edit className="mr-2 size-4" />
            카테고리 수정
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className="text-destructive"
          >
            <Trash className="mr-2 size-4" />
            카테고리 삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
