import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req: any) {
    // this validation will cause that we won't be able to use the RequireFeature component. So instead of
    // showing Access denied will perform the redirect. How to use that depends probably on the requirements
    if (req.nextUrl.pathname.startsWith('/admin') && !req.nextauth.token.user.features.includes('admin')) {
      return NextResponse.redirect(
        new URL('/?message=NotAdmin', req.url)
      )
    }
    if (req.nextUrl.pathname.startsWith('/user') && !req.nextauth.token.user.features.includes('user')) {
      return NextResponse.redirect(
        new URL('/?message=NotUser', req.url)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }: any) => !!token
    },
  }
)

export const config = {
  matcher: ['/admin', '/user']
}
