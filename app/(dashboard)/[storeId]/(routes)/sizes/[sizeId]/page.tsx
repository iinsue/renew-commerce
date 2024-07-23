import db from "@/lib/prismadb";
import { SizeForm } from "./_components/size-form";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  // DB에서 사이즈 세부사항 조회
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <>
      <div className="space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </>
  );
};

export default SizePage;
