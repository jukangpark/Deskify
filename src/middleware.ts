import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // 쿠키에서 세션 토큰 추출
  const token =
    req.cookies.get("sb-aqcpjrrdkmffieyetetc-auth-token-code-verifier")
      ?.value || req.cookies.get("sb-aqcpjrrdkmffieyetetc-auth-token.0")?.value;

  if (!token) {
    // token 이 없으면 로그인 페이지로 리다이렉트합니다.
    // 절대 경로 URL 을 생성하여 리다이렉트
    const logInUrl = new URL("/login", req.url);
    return NextResponse.redirect(logInUrl);
  }

  // 나머지 미들웨어 로직
  return NextResponse.next();
}

export const config = {
  matcher: [
    // _next/static, _next/image, favicon.ico, 및 images 디렉토리의 파일을 제외하고 모든 경로에 대해 미들웨어를 적용합니다.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|login).*)",
  ],
};
