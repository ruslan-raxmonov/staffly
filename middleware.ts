import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const USER_COOKIE = "staffly_user_session";
const ADMIN_COOKIE = "staffly_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userSession = req.cookies.get(USER_COOKIE)?.value;
  const adminSession = req.cookies.get(ADMIN_COOKIE)?.value;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/app")) {
    if (!userSession) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    pathname !== "/admin"
  ) {
    // /admin itself handles login UI; nested routes need cookie
    if (!adminSession && pathname !== "/admin") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  // Nested admin routes: require admin cookie
  if (
    (pathname.startsWith("/admin/applications") ||
      pathname.startsWith("/admin/users") ||
      pathname.startsWith("/admin/workspaces") ||
      pathname.startsWith("/admin/analytics") ||
      pathname.startsWith("/admin/email") ||
      pathname.startsWith("/admin/notifications") ||
      pathname.startsWith("/admin/settings")) &&
    !adminSession
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/app/:path*", "/admin/:path*"],
};
