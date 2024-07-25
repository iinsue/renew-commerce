"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, ProductColumn } from "./columns";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

type Props = {
  data: ProductColumn[];
};

export const ProductClient: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const onAddClick = () => {
    router.push(`/${params.storeId}/products/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`상품 (0)`} description="상품을 관리할 수 있습니다." />
        <Button onClick={onAddClick}>
          <Plus className="mr-2 size-4" />
          상품 추가
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="상품을 위한 API를 제공합니다." />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
