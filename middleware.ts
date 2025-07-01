import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/transactions(.*)",
    "/account(.*)"
])

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth()
    if(!userId && isProtectedRoute(req)) {
        const { redirectToSignIn } = await auth();
        return redirectToSignIn();
    }
})

export const config = {
  matcher: [
    // Matches everything EXCEPT static assets and public folders
    '/((?!_next|favicon.ico|images|.*\\.(?:ico|png|jpg|jpeg|webp|svg|gif|css|js)).*)',
    '/api/(.*)',
  ],
};