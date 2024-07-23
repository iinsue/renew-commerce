"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { Billboard, Category } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, { message: "카테고리 이름을 입력해주세요." }),
  billboardId: z.string().min(1, { message: "빌보드를 선택해주세요." }),
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
        await axios.post(`/api/${params.storeId}/categories`, values);
        toast.success("카테고리가 등록되었습니다.", {
          id: "category",
        });
        router.push(`/${params.storeId}/categories`);
        router.refresh();
      } catch (error) {
        toast.error("등록에 실패했습니다.", {
          id: "category",
        });
      }
    });
  };

  const onDelete = () => {
    startDeleteTransition(async () => {
      try {
        await axios.delete(
          `/api/${params.storeId}/categories/${params.categoryId}`,
        );
        toast.success("카테고리가 삭제되었습니다.", {
          id: "delete-category",
        });
        router.push(`/${params.storeId}/categories`);
        router.refresh();
      } catch (error) {
        toast.error("카테고리 삭제에 실패했습니다.", {
          id: "delete-category",
        });
      }
    });
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isDeletePending}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            onClick={() => setIsOpen(true)}
            size="icon"
            disabled={isPending}
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
                  <FormLabel>카테고리 이름</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="카테고리 이름을 입력하세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="billboardId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>빌보드</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="빌보드를 선택하세요."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isPending} className="ml-auto">
            {actions}
          </Button>
        </form>
      </Form>
    </>
  );
};
