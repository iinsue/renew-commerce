"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { BillboardColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

type Props = {
  data: BillboardColumns[];
};

export const BillboardClient = ({ data }: Props) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`빌보드 (${data.length})`}
          description="가게의 빌보드를 관리할 수 있습니다."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 size-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};
