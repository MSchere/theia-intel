import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const defaultRoute = "/map";

const roleRoutes = [
    { path: "/profile", roles: ["bronze", "silver", "gold", "admin"] },
    { path: "/map", roles: ["bronze", "silver", "gold", "admin"] },
    { path: "/dashboard", roles: ["bronze", "silver", "gold", "admin"] },
    { path: "/news", roles: ["bronze", "silver", "gold", "admin"] },
    { path: "/reports", roles: ["bronze", "silver", "gold", "admin"] },
    { path: "/markets", roles: ["bronze", "silver", "gold", "admin"] },
    { path: "/stocks", roles: ["bronze", "silver", "gold", "admin"] },
];

export default withAuth(function middleware(req): NextResponse {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    // If there's no token, and we are not in the login page, redirect to the login page
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    // If there's a token and the user is trying to access the home page, redirect to the default route for the user's role
    if (token && (pathname == "/" || pathname == "/login")) {
        return NextResponse.redirect(new URL(defaultRoute, req.url));
    }
    // If there's a token and the user is trying to access a route that requires a role, check if the user has the required role
    if (token) {
        const routeRol = roleRoutes.find((route) => pathname.startsWith(route.path));
        if (routeRol?.roles.includes(token.role as string)) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL(defaultRoute, req.url));
    }
    return NextResponse.redirect(new URL("/login", req.url));
});

export const config = {
    matcher: [
        // Match all request paths except for the ones starting with:
        "/((?!img|_next/|favicon.ico|404|api|login).*)",
    ],
};
