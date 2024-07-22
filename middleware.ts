import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 접근 가능한 라우트 목록
const publicRoutes = createRouteMatcher([
  "/api/:path*",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware((auth, request) => {
  // 접근 가능한 라우트 이외에는 로그인해야 접근 가능
  if (!publicRoutes(request)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
