import { Navbar } from "@/components/navigation/navbar";
import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: { storeId: string };
};

const DashboardLayout = async ({ children, params }: Props) => {
  const { userId } = auth();

  // 사용자 인증이 안되면 로그인 페이지로 이동
  if (!userId) {
    redirect("/sign-in");
  }

  // 접근한 가게가 로그인된 사용자가 등록한 가게인지 DB에서 확인
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  // 등록된 가게가 없으면 메인페이지(가게등록 모달)로 이동
  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
