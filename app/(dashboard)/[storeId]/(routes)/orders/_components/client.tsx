import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns, OrderColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";

type Props = {
  data: OrderColumn[];
};

export const OrdersClient: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Heading
        title={`주문 (${data.length})`}
        description="주문정보조회를 위한 API를 제공합니다."
      />
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};
