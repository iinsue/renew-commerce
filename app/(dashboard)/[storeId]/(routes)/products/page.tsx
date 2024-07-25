import db from "@/lib/prismadb";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { formatter } from "@/lib/utils";

import { ProductClient } from "./_components/client";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  // DB에서 상품 리스트 가져오기
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 상품 리스트 데이터 가공
  const formattedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatter.format(product.price.toNumber()),
    category: product.category.name,
    color: product.color.name,
    size: product.size.name,
    createdAt: format(product.createdAt, "yyyy-MM-dd", { locale: ko }),
  }));

  return (
    <>
      <div className="space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </>
  );
};

export default ProductsPage;
