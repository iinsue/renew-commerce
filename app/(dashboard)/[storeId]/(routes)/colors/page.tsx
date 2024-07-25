import db from "@/lib/prismadb";
import { format } from "date-fns";

import { ColorsClient } from "./_components/client";
import { ko } from "date-fns/locale";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  // DB에서 색상 리스트 조회
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 색상 리스트 데이터 가공
  const formattedColors = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "yyyy-MM-dd", { locale: ko }),
  }));

  return (
    <>
      <div className="space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </>
  );
};

export default ColorsPage;
