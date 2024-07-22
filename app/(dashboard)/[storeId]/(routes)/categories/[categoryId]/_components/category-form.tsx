"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

type Props = {
  initialData: Category | null;
  billboards: Billboard[];
};

export const CategoryForm: React.FC<Props> = ({ initialData, billboards }) => {
  const params = useParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const title = initialData ? "카테고리 수정" : "카테고리 생성";
  const description = initialData
    ? "카테고리를 수정합니다."
    : "카테고리를 생성합니다.";
  const actions = initialData ? "변경하기" : "생성하기";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "", billboardId: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
      } catch (error) {
        toast.error("", { id: "category" });
      }
    });
  };

  return (
    <>
      <div>Category Form</div>
    </>
  );
};
