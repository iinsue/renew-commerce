"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

type Props = {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export const Modal: React.FC<Props> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (open === false) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
