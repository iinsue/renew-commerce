import db from "@/lib/prismadb";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { BillboardClient } from "./_components/client";
import { BillboardColumns } from "./_components/columns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  // 빌보드 리스트 DB에서 가져오기
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumns[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "yyyy-MM-dd", { locale: ko }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
