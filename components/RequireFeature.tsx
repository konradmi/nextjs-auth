'use client'

import react, { ReactNode } from 'react'
import { useSession } from 'next-auth/react'

type RequireFeatureProps = {
  features: string[]
  children: ReactNode,
}

const RequireFeature = ({ features, children }: RequireFeatureProps) => {
  const { data: session } = useSession()
  console.log('session', session)

  const userFeatures = session?.user.features || []

  const hasFeatures = userFeatures.every(userFeature => features.includes(userFeature))

  return hasFeatures
    ? <>{children}</>
    : <>{'Access Denied'}</>
}

export default RequireFeature
