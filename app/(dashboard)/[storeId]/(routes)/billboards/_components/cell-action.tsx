"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { BillboardColumns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";

type Props = {
  data: BillboardColumns;
};

export const CellActionComponent: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeletePending, startDeleteTransition] = useTransition();

  // 클립보드에 클릭한 빌보드 아이디 복사
  const onCopyClick = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("클립보드에 복사되었습니다.", {
      id: "copy-to-clipboard",
    });
  };

  // 빌보드 수정 클릭 시 수정 페이지로 이동
  const onUpdateClick = () => {
    router.push(`/${params.storeId}/billboards/${data.id}`);
  };

  // 빌보드 삭제 확인
  const onDeleteConfirm = () => {
    startDeleteTransition(async () => {
      try {
        await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
        router.refresh();
        toast.success("삭제되었습니다.", { id: "delete-billboard" });
      } catch (error) {
        toast.error("모든 물품과 카테고리를 삭제했는지 확인하세요.", {
          id: "delete-billboard",
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
        onClose={() => setIsOpen(false)}
        onConfirm={onDeleteConfirm}
        loading={isDeletePending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open Menu</span>
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
          <DropdownMenuItem onClick={onUpdateClick}>
            <Edit className="mr-2 size-4" />
            빌보드 수정
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setIsOpen(true)}
          >
            <Trash className="mr-2 size-4" />
            빌보드 삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
