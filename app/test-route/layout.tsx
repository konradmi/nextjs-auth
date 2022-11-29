import React from 'react'

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      <div>test-route layout</div>
      {children}
    </>
  )
}
