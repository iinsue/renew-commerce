"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();

  return (
    <Modal
      title="상점 만들기"
      description="새 상점을 만들어 상품들과 카테고리를 관리해보세요!"
      isOpen={isOpen}
      onClose={onClose}
    >
      TODO: 상점을 생성할 폼 만들기
    </Modal>
  );
};
