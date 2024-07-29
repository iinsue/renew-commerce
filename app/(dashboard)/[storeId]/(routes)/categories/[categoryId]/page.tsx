import db from "@/lib/prismadb";
import { CategoryForm } from "./_components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  // DB에서 카테고리 정보 조회
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
    include: {
      billboard: true,
    },
  });

  // DB에서 가게가 만든 빌보드 리스트 조회
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
