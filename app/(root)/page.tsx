"use client";

import { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";

import { useStoreModal } from "@/hooks/use-store-modal";

export default function Home() {
  const { onOpen, isOpen } = useStoreModal();

  useEffect(() => {
    console.log("open", isOpen);
    if (isOpen === false) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <main className="h-full bg-slate-200 p-2">
      <UserButton afterSwitchSessionUrl="/" />

      <div>메인 페이지</div>
    </main>
  );
}
