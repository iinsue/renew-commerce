import db from "@/lib/prismadb";

import { ProductForm } from "./_components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  // DB에서 상품 찾기
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  // DB에서 카테고리 목록 조회
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  // DB에서 사이즈 목록 조회
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  // DB에서 색상 목록 조회
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <>
      <div className="space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          sizes={sizes}
          colors={colors}
          initialData={product}
        />
      </div>
    </>
  );
};

export default ProductPage;
