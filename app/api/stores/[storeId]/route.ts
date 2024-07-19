import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 가게 수정
export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await request.json();

    // 수정할 가게의 이름
    const { name } = body;

    // 인증된 사용자인지 확인
    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    // 수정할 가게의 이름의 값이 있는지 확인
    if (!name) {
      return new NextResponse("가게 이름이 존재하지 않습니다.", {
        status: 400,
      });
    }

    // 가게 아이디가 있는지 확인
    if (!params.storeId) {
      return new NextResponse("가게가 존재하지 않습니다.", { status: 400 });
    }

    // 수정요청된 가게 이름으로 변경
    const store = await db.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_PATCH]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}

// 가게 제거
export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();

    // 인증된 사용자인지 확인
    if (!userId) {
      return new NextResponse("로그인이 필요합니다.", { status: 401 });
    }

    // 가게 아이디가 있는지 확인
    if (!params.storeId) {
      return new NextResponse("가게가 존재하지 않습니다.", { status: 400 });
    }

    // 가게를 DB에서 제거
    const store = await db.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_DELETE]", error);
    return new NextResponse("서버 오류", { status: 500 });
  }
}
