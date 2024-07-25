import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; colorId: string } },
) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    if (!name) {
      return new NextResponse("색상 이름을 입력하세요.", { status: 400 });
    }

    if (!value) {
      return new NextResponse("색상 코드를 입력하세요.", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("스토어가 존재하지 않습니다.", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("권한이 없습니다.", { status: 403 });
    }

    // 색상 수정
    const color = await db.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string; colorId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("스토어가 존재하지 않습니다.", { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse("색상이 존재하지 않습니다.", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("권한이 없습니다.", { status: 403 });
    }

    // 색상 삭제
    const color = await db.color.delete({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}
