import db from "@/lib/prismadb";
import { BillboardForm } from "./_components/billboard-form";

type Props = {
  params: { billboardId: string };
};

const BillboardPage = async ({ params }: Props) => {
  // DB에서 빌보드 아이디로 빌보드 정보 가져오기
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
