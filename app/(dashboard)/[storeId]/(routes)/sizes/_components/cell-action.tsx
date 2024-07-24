"use client";

import axios from "axios";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";
import { SizeColumn } from "./columns";

type Props = {
  data: SizeColumn;
};

export const CellAction: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  // 삭제 모달
  const [isOpen, setIsOpen] = useState(false);
  const [isDeletePending, startDeleteTransition] = useTransition();

  // 클립보드에 사이즈 아이디 복사
  const onCopyClick = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("클립보드에 복사되었습니다.", {
      id: "copy-to-clipboard",
    });
  };

  // 수정페이지로 이동
  const onUpdateClick = () => {
    router.push(`/${params.storeId}/sizes/${data.id}`);
  };

  const onDeleteModalOpen = () => {
    setIsOpen(true);
  };

  const onDeleteModalClose = () => {
    setIsOpen(false);
  };

  // 사이즈 삭제 확인
  const onDeleteConfirm = () => {
    startDeleteTransition(async () => {
      try {
        await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
        toast.success("사이즈를 삭제했습니다.", { id: "size-delete" });
        router.refresh();
      } catch (error) {
        toast.error("이 사이즈를 사용하는 물품을 삭제해주세요.", {
          id: "size-delete",
        });
      } finally {
        setIsOpen(false);
      }
    });
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={onDeleteModalClose}
        onConfirm={onDeleteConfirm}
        loading={isDeletePending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
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
          <DropdownMenuItem onClick={onUpdateClick}>
            <Edit className="mr-2 size-4" />
            사이즈 수정
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDeleteModalOpen}
            className="text-destructive"
          >
            <Trash className="mr-2 size-4" /> 사이즈 삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
