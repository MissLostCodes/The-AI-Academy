import { clerkMiddleware ,  createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)' , '/create' , '/course(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})
//createRouteMatcher() is a Clerk helper function that allows you to protect multiple routes. 
//createRouteMatcher() accepts an array of routes and checks if the route the user is trying 
//to visit matches one of the routes passed to it.
//createRouteMatcher() sets all /dashboard  routes as protected routes. 

//Use auth.protect() if you want to redirect unauthenticated 
//users to the sign-in route automatically.
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};


// The matcher is an array of patterns (routes) that determine where the middleware should run.

//It's telling Clerk's middleware:

//"Run for these specific paths" (and don’t run for others).
