"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { AlertModal } from "@/components/modals/alert-modal";

type Props = {
  initialData: Store;
};

const formSchema = z.object({
  name: z.string().min(1),
});

export const SettingsForm: React.FC<Props> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isPatchPending, setPatchTransition] = useTransition();
  const [isDeletePending, setDeleteTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  // 수정 기능
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setPatchTransition(async () => {
      try {
        await axios.patch(`/api/stores/${params.storeId}`, values);
        router.refresh();
        toast.success("가게 이름이 변경되었습니다.", { id: "patch-store" });
      } catch (error) {
        toast.error("이름 변경에 실패했습니다.", { id: "patch-store" });
      }
    });
  };

  // 삭제 기능
  const onDelete = () => {
    setDeleteTransition(async () => {
      try {
        await axios.delete(`/api/stores/${params.storeId}`);
        router.refresh();
        toast.success("삭제되었습니다.", { id: "delete-store" });
        router.push("/");
      } catch (error) {
        toast.error("모든 물품과 카테고리를 삭제했는지 확인하세요.", {
          id: "delete-store",
        });
      } finally {
        setIsOpen(false);
      }
    });
  };

  return (
    <>
      {/* 삭제 확인 모달 */}
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isDeletePending}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          disabled={isPatchPending}
          variant="destructive"
          size="icon"
          onClick={() => setIsOpen(true)}
        >
          <Trash className="size-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPatchPending}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPatchPending} className="ml-auto" type="submit">
            {isPatchPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            변경하기
          </Button>
        </form>
      </Form>
    </>
  );
};
