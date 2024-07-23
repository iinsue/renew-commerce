import db from "@/lib/prismadb";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { SizeClient } from "./_components/client";
import { SizeColumn } from "./_components/columns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  // DB에서 사이즈 조회
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 조회한 사이즈 데이터 가공
  const formattedSizes: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "yyyy-MM-dd", { locale: ko }),
  }));

  return (
    <>
      <div className="space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </>
  );
};

export default SizesPage;
