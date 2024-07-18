import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "./_components/settings-form";

type Props = {
  params: {
    storeId: string;
  };
};

const SettingsPage: React.FC<Props> = async ({ params }) => {
  // 로그인된 사용자인지 확인
  const { userId } = auth();

  // 로그인하지 않았으면 로그인 페이지로 이동
  if (!userId) {
    redirect("/sign-in");
  }

  // 로그인된 사용자가 등록한 모든 가게 중에서 DB에서 가장 먼저 찾은 가게 정보
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  // 등록된 가게 정보가 없다면 메인 페이지로 가게 등록 모달로 이동
  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
