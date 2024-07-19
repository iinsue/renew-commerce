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
  const [isPending, setStartTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setStartTransition(async () => {
      try {
        await axios.patch(`/api/stores/${params.storeId}`, values);
        router.refresh();
        toast.success("가게 이름이 변경되었습니다.", { id: "update-success" });
      } catch (error) {
        toast.error("이름 변경에 실패했습니다.");
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          disabled={isPending}
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
                      disabled={isPending}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} className="ml-auto" type="submit">
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};
