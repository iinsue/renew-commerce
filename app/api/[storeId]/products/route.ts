import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    if (!name) {
      return new NextResponse("상품명이 필요합니다.", { status: 400 });
    }
    if (!price) {
      return new NextResponse("가격이 필요합니다.", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("이미지가 필요합니다.", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("카테고리가 필요합니다.", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("사이즈가 필요합니다.", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("색상이 필요합니다.", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("매장이 필요합니다.", { status: 400 });
    }
    const storeByUserId = await db.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("권한이 없습니다", { status: 403 });
    }

    // 상품 등록
    const product = await db.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}
