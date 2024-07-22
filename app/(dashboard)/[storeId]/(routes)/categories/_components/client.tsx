"use client";

import { useParams, useRouter } from "next/navigation";

import { CategoryColumn, columns } from "./columns";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { Plus } from "lucide-react";

type Props = {
  data: CategoryColumn[];
};

export const CategoryClient: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`카테고리 (${data.length})`}
          description="가게의 카테고리를 관리할 수 있습니다."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 size-4" />
          카테고리 생성
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="카테고리를 위한 API를 제공합니다." />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};
