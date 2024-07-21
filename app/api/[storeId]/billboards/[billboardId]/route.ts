import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import db from "@/lib/prismadb";

// 빌보드 정보 조회
export async function GET(
  request: Request,
  { params }: { params: { billboardId: string } },
) {
  try {
    // 빌보드 아이디가 params에 있는지 확인
    if (!params.billboardId) {
      return new NextResponse("빌보드가 존재하지 않습니다.", { status: 400 });
    }

    // 빌보드 아이디로 빌보드 정보 DB에서 조회
    const billboard = await db.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}

// 빌보드 정보 수정
export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; billboardId: string } },
) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { label, imageUrl } = body;

    // 인증된 사용자인지 확인
    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    // 입력된 이름이 있는지 확인
    if (!label) {
      return new NextResponse("이름을 입력하세요.", { status: 400 });
    }

    // 등록된 이미지 URL이 있는지 확인
    if (!imageUrl) {
      return new NextResponse("이미지를 등록하세요.", { status: 400 });
    }

    // 유저가 권한이 있는지 확인
    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    // 권한이 없다면 에러 반환
    if (!storeByUserId) {
      return new NextResponse("권한이 없습니다.", { status: 403 });
    }

    // 빌보드 수정
    const billboard = await db.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { billboardId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    // 인증된 사용자인지 확인
    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    // 빌보드 아이디가 params에 있는지 확인
    if (!params.billboardId) {
      return new NextResponse("빌보드가 존재하지 않습니다.", { status: 400 });
    }

    // 유저가 권한이 있는지 확인
    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    // 권한이 없다면 에러 반환
    if (!storeByUserId) {
      return new NextResponse("권한이 없습니다.", { status: 403 });
    }

    // 빌보드 DB에서 삭제
    const billboard = await db.billboard.delete({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}
