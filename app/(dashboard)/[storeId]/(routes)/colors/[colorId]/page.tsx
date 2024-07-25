import db from "@/lib/prismadb";
import { ColorForm } from "./_components/color-form";

const ColorEditPage = async ({ params }: { params: { colorId: string } }) => {
  // DB에서 색상 조회
  const color = await db.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <>
      <div className="space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </>
  );
};

export default ColorEditPage;
