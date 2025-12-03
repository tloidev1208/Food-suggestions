import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // cookie xác thực

  const { pathname } = req.nextUrl;

  // Nếu user chưa đăng nhập
  if (!token) {
    // Cho phép truy cập trang chủ "/"
    if (pathname === "/") {
      return NextResponse.next();
    }

    // Các trang khác → redirect về trang login
    if (pathname.startsWith("/")) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Nếu user đã đăng nhập thì cho vào bình thường
  return NextResponse.next();
}

// Áp dụng middleware cho toàn bộ routes
export const config = {
  matcher: ["/:path*"],
};
