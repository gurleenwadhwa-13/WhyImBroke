import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/transactions(.*)",
  "/account(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Only match actual application routes, exclude all static assets
    '/((?!_next|favicon.ico|images|fonts|api|.*\\.(svg|png|jpg|jpeg|gif|webp|css|js|ico|json|map|txt)$).*)',
  ],
};
