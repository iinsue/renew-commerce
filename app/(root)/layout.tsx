import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const SetupLayout = async ({ children }: Props) => {
  const { userId } = auth();

  // 사용자 인증이 안되면 로그인 페이지로 이동
  if (!userId) {
    redirect("/sign-in");
  }

  // 로그인된 사용자가 등록한 가게가 있는지 확인
  // 만약 등록한 가게가 있다면 DB에서 찾은 첫번째 가게 정보를 반환
  const store = await db.store.findFirst({
    where: {
      userId,
    },
  });

  // 로그인된 사용자가 등록한 가게가 있다면 그 가게 페이지로 이동
  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
};

export default SetupLayout;
