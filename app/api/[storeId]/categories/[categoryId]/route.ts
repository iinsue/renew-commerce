import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; categoryId: string } },
) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { name, billboardId } = body;

    // 인증된 사용자인지 확인
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // 카테고리 이름이 있는지 확인
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // 빌보드 아이디가 있는지 확인
    if (!billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    // 카테고리 아이디가 params에 있는지 확인
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    // 유저가 권한이 있는지 확인
    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // 카테고리 수정
    const category = await db.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string; categoryId: string } },
) {
  try {
    const { userId } = auth();

    // 인증된 사용자인지 확인
    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    // 카테고리 아이디가 params에 있는지 확인
    if (!params.categoryId) {
      return new NextResponse("카테고리를 찾을 수 없습니다.", {
        status: 400,
      });
    }

    // 유저가 권한이 있는지 확인
    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    // 권한이 없다면 에러 반환
    if (!storeByUserId) {
      return new NextResponse("권한이 없습니다.", { status: 403 });
    }

    // 카테고리 삭제
    const category = await db.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}
