"use client";

import * as z from "zod";
import { Color } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  name: z.string().min(1, { message: "색상 이름을 입력해주세요." }),
  value: z
    .string()
    .regex(/^#/, { message: "HEX CODE를 입력해주세요." })
    .min(4, { message: "4자이상 입력하세요." }),
});

type Props = {
  initialData: Color | null;
};

export const ColorForm: React.FC<Props> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  // 색상 등록 & 수정 트랜지션
  const [isPending, startTransition] = useTransition();

  // 색상 삭제모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const onDeleteModalOpen = () => setIsDeleteModalOpen(true);
  const onDeleteModalClose = () => setIsDeleteModalOpen(false);

  // 색상 삭제 트랜지션
  const [isDeletePending, startDeleteTransition] = useTransition();

  const title = initialData ? "색상 수정" : "색상 등록";
  const description = initialData
    ? "색상을 수정합니다."
    : "새로운 색상을 추가합니다.";
  const action = initialData ? "수정하기" : "추가하기";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "", value: "" },
  });

  // 색상 등록 & 수정
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        if (initialData) {
          // 색상 수정
          await axios.patch(
            `/api/${params.storeId}/colors/${params.colorId}`,
            values,
          );
          toast.success("색상이 수정되었습니다.", { id: "color" });
        } else {
          // 색상 등록
          await axios.post(`/api/${params.storeId}/colors`, values);
          toast.success("색상이 등록되었습니다.", { id: "color" });
        }
        router.push(`/${params.storeId}/colors`);
        router.refresh();
      } catch (error) {
        toast.error("실패했습니다.", { id: "color" });
      }
    });
  };

  // 색상 삭제
  const onDelete = () => {
    startDeleteTransition(async () => {
      try {
        await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
        toast.success("색상이 삭제되었습니다.", { id: "color" });
        router.push(`/${params.storeId}/colors`);
        router.refresh();
      } catch (error) {
        toast.error("실패했습니다.", { id: "color" });
      }
    });
  };

  return (
    <>
      <AlertModal
        isOpen={isDeleteModalOpen}
        loading={isDeletePending}
        onClose={onDeleteModalClose}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            size="icon"
            variant="destructive"
            onClick={onDeleteModalOpen}
            disabled={isDeletePending}
          >
            <Trash className="size-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>색상 이름</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="색상 이름을 입력하세요."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="value"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HEX CODE</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-2">
                      <Input
                        disabled={isPending}
                        placeholder="색상 코드를 입력하세요."
                        {...field}
                      />
                      <div
                        className="rounded-full border p-4"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="ml-auto" type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
