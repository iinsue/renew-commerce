"use client";

import { Modal } from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="h-full bg-slate-200 p-2">
      <UserButton afterSwitchSessionUrl="/" />

      <Modal
        title="Test"
        description="Test Description"
        isOpen={true}
        onClose={() => {}}
      >
        Modal Content
      </Modal>
    </main>
  );
}
