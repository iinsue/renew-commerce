import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; sizeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { name, value } = body;

    // 인증된 사용자인지 확인
    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    // 입력된 사이즈 명칭이 있는지 확인
    if (!name) {
      return new NextResponse("사이즈 명칭을 찾을 수 없습니다.", {
        status: 400,
      });
    }

    // 입력된 수치값이 있는지 확인
    if (!value) {
      return new NextResponse("수치를 찾을 수 없습니다", { status: 400 });
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
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // 사이즈 수정
    const size = await db.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}
