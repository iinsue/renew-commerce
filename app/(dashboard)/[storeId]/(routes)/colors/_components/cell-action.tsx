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
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState, useTransition } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import { toast } from "sonner";
import axios from "axios";

type Props = {
  data: ColorColumn;
};

export const CellAction: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [isDeletePending, startDeleteTransition] = useTransition();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const onDeleteModalOpen = () => setIsDeleteModalOpen(true);
  const onDeleteModalClose = () => setIsDeleteModalOpen(false);

  // 색상수정 클릭 시 수정 페이지로 이동
  const onEditClick = () => {
    router.push(`/${params.storeId}/colors/${data.id}`);
  };

  // 아이디를 클립보드로 복사
  const onCopyClick = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("클립보드에 복사되었습니다.", {
      id: "copy-to-clipboard",
    });
  };

  // 색상 제거
  const onDelete = () => {
    startDeleteTransition(async () => {
      try {
        await axios.delete(`/api/${params.storeId}/colors/${data.id}`);
        router.refresh();
        toast.success("색상이 제거되었습니다.", { id: "color" });
      } catch (error) {
        toast.error("실패했습니다.", { id: "color" });
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
            색상 수정
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={onDeleteModalOpen}
          >
            <Trash className="mr-2 size-4" />
            색상 제거
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
