import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
    const { data: { user } } = await createClient().auth.getUser();

    // 로그인 페이지에 접근하려고 할 때
    if (request.nextUrl.pathname === "/login") {
        // 이미 로그인된 상태라면 홈페이지로 리다이렉트
        if (user) {
            return Response.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
