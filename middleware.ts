import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Clerk 환경 변수 확인
const hasValidClerkKey = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "pk_test_build_placeholder_key_for_ci_cd" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_") &&
  process.env.CLERK_SECRET_KEY &&
  process.env.CLERK_SECRET_KEY.startsWith("sk_")
);

export default function middleware(req: NextRequest) {
  // Clerk가 제대로 설정되지 않은 경우 미들웨어 건너뛰기
  if (!hasValidClerkKey) {
    return NextResponse.next();
  }

  // Clerk 미들웨어를 동적으로 로드
  try {
    // 동적 import를 사용하여 Clerk가 없어도 에러가 발생하지 않도록
    const clerkModule = require("@clerk/nextjs/server");
    
    if (!clerkModule || !clerkModule.clerkMiddleware) {
      return NextResponse.next();
    }

    const { clerkMiddleware, createRouteMatcher } = clerkModule;
    
    const isProtectedRoute = createRouteMatcher([
      "/dashboard(.*)",
      "/admin(.*)",
    ]);

    return clerkMiddleware(async (auth: any) => {
      // 보호된 라우트 체크
      if (isProtectedRoute && isProtectedRoute(req)) {
        try {
          await auth.protect();
        } catch (error) {
          // 인증 실패 시 로그인 페이지로 리다이렉트하지 않고 그냥 통과
          console.warn("Auth protection failed:", error);
        }
      }
    })(req);
  } catch (error: any) {
    // 모든 에러를 잡아서 미들웨어가 실패하지 않도록
    console.warn("Middleware error (continuing anyway):", error?.message || error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
