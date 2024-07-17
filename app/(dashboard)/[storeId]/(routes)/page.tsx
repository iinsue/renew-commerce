import db from "@/lib/prismadb";

type Props = {
  params: { storeId: string };
};

const DashboardPage: React.FC<Props> = async ({ params }: Props) => {
  // DB 상에서 해당하는 아이디의 가게 정보를 가져옵니다.
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <>
      <div>활성화된 스토어: {store?.name}</div>
    </>
  );
};

export default DashboardPage;
