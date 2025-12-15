import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/sign-up", "/sign-in"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Cho phép route public
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Lấy token từ cookie
  const token = req.cookies.get("token")?.value;

  // Chưa đăng nhập → đá về sign-in
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
