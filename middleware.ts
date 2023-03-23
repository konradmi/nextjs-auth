import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req: any) {
    if (req.nextUrl.pathname.startsWith('/admin') && !req.nextauth.token.user.features.includes('admin')) {
      return NextResponse.redirect(
        new URL('/auth/login?message=NotAdmin', req.url)
      )
    }
    if (req.nextUrl.pathname.startsWith('/user') && !req.nextauth.token.user.features.includes('user')) {
      return NextResponse.redirect(
        new URL('/auth/login?message=NotAdmin', req.url)
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
