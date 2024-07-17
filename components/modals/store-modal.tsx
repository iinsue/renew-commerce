"use client";

import * as z from "zod";
import { useTransition } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      startTransition(async () => {
        const response = await axios.post("/api/stores", values);
        window.location.assign(`/${response.data.id}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="가게 등록"
      description="새 가게를 만들어 상품들과 카테고리를 관리해보세요."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>가게 이름</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="가게 이름을 입력하세요."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-end space-x-2 pt-6">
              <Button
                disabled={isPending}
                variant="outline"
                type="button"
                onClick={onClose}
              >
                취소하기
              </Button>
              <Button type="submit" disabled={isPending}>
                계속하기
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
