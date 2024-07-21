import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 빌보드 등록
export async function POST(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { label, imageUrl } = body;

    // 인증된 사용자인지 확인
    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    if (!label) {
      return new NextResponse("이름을 입력하세요.", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("이미지를 등록하세요.", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("가게 이름을 찾을 수 없습니다.", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("권한이 없습니다.", { status: 403 });
    }

    const billboard = await db.billboard.create({
      data: { label, imageUrl, storeId: params.storeId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}

// 등록된 빌보드 리스트 조회
export async function GET(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params.storeId) {
      return new NextResponse("가게 이름을 찾을 수 없습니다.", { status: 400 });
    }

    const billboards = await db.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}
