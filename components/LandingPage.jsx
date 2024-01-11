import Link from 'next/link'

const LandingPage = () => {
  return (
    <div>LandingPage
         <Link href={'/login'}>Log In</Link>
    </div>
  )
}

export default LandingPage