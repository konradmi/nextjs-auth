import Link from 'next/link'

const HomeLinks = () => {
  return(
    <>
      <Link href={'/'}>Home</Link>
      <Link href={'/admin'}>Admin</Link>
    </>
  )
}

export default HomeLinks
