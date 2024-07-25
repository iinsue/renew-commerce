"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export const ColorsClient = () => {
  const router = useRouter();
  const params = useParams();

  // 색상 추가 페이지로 이동
  const onAddClick = () => {
    router.push(`/${params.storeId}/colors/new`);
  };

  return (
    <>
      <div>
        <Heading
          title={`Colors (0)`}
          description="색상을 관리할 수 있습니다."
        />
        <Button onClick={onAddClick}>
          <Plus className="mr-2 size-4" />
          색상 추가
        </Button>
      </div>
    </>
  );
};
