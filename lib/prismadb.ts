import { PrismaClient } from "@prisma/client";

// 이렇게 설정하지 않으면 Next13 에서 무수한 Warning 이 출력됩니다.

declare global {
  var prisma: PrismaClient | undefined;
}

const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export default db;
