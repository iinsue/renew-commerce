"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

export default function SetupPage() {
  const { onOpen, isOpen } = useStoreModal();

  useEffect(() => {
    if (isOpen === false) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
