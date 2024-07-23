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
    const { name, billboardId } = body;

    // 인증된 사용자인지 확인
    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    // 입력된 이름이 있는지 확인
    if (!name) {
      return new NextResponse("이름을 입력하세요.", { status: 400 });
    }

    // 입력된 빌보드 아이디가 있는지 확인
    if (!billboardId) {
      return new NextResponse("빌보드를 찾을 수 없습니다.", { status: 400 });
    }

    // 가게 아이디가 params에 있는지 확인
    if (!params.storeId) {
      return new NextResponse("가게 이름을 찾을 수 없습니다.", { status: 400 });
    }

    // 유저가 권한이 있는지 확인
    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    // 권한이 없다면 에러 반환
    if (!storeByUserId) {
      return new NextResponse("권한이 없습니다.", { status: 403 });
    }

    // 카테고리 생성
    const category = await db.category.create({
      data: { name, billboardId, storeId: params.storeId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}
