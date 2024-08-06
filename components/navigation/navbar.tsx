import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import db from "@/lib/prismadb";
import { UserButton } from "@clerk/nextjs";

import { NavLinks } from "./nav-links";
import { StoreSwitcher } from "./store-switcher";
import { ThemeToggle } from "../theme-toggle";

export const Navbar = async () => {
  // 로그인된 사용자인지 확인
  const { userId } = auth();

  // 로그인하지 않았으면 로그인 페이지로 이동
  if (!userId) {
    redirect("/sign-in");
  }

  // 로그인된 사용자가 등록한 모든 가게 리스트를 DB에서 가져오는 코드
  const stores = await db.store.findMany({ where: { userId } });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <NavLinks className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSwitchSessionUrl="/" />
        </div>
      </div>
    </div>
  );
};
