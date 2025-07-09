import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/transactions(.*)",
  "/account(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip middleware for static assets
  if (
    req.nextUrl.pathname.startsWith('/images') ||
    req.nextUrl.pathname.startsWith('/fonts') ||
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname === '/favicon.ico' ||
    /\.(svg|png|jpg|jpeg|gif|webp|css|js|ico|json|map|txt)$/.test(req.nextUrl.pathname)
  ) {
    return;
  }

  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Match all routes except static assets
    '/((?!_next/.*|favicon.ico|fonts/.*|api/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|ico|json|map|txt)).*)',
  ],
};