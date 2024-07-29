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
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn } from "./columns";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import axios from "axios";

type Props = {
  data: ProductColumn;
};

export const CellActionComponent = ({ data }: Props) => {
  const router = useRouter();
  const params = useParams();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const onDeleteModalOpen = () => setIsDeleteModalOpen(true);
  const onDeleteModalClose = () => setIsDeleteModalOpen(false);

  const [isDeletePending, startDeleteTransition] = useTransition();

  // 수정 페이지로 이동
  const onEditClick = () => {
    router.push(`/${params.storeId}/products/${data.id}`);
  };

  // 아이디를 클립보드로 복사
  const onCopyClick = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("클립보드에 복사되었습니다.", {
      id: "copy-to-clipboard",
    });
  };

  // 상품 삭제
  const onDelete = () => {
    startDeleteTransition(async () => {
      try {
        await axios.delete(`/api/${params.storeId}/products/${data.id}`);
        router.refresh();
        toast.success("상품이 삭제되었습니다.", { id: "product" });
      } catch (error) {
        toast.error("실패했습니다.", { id: "product" });
      } finally {
        setIsDeleteModalOpen(false);
      }
    });
  };

  return (
    <>
      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        onConfirm={onDelete}
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
          <DropdownMenuItem onClick={onCopyClick}>
            <Copy className="mr-2 size-4" />
            아이디 복사
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEditClick}>
            <Edit className="mr-2 size-4" />
            상품 수정
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDeleteModalOpen}
            className="text-destructive"
          >
            <Trash className="mr-2 size-4" />
            상품 삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
