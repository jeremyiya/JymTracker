'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Nav = () => {

    const pathname = usePathname();
    
  return (
    <nav>
        <div className="nav_logo">
            <Link href="/">
                <Image 
                    src={'/media/png/logo.png'}
                    width={611}
                    height={95}
                    alt='JYM TRACKER Logo'
                />
            </Link>
            
        </div>
        <span className="nav_seperator"></span>
        <ul>
            <li>
                <Link className={`${pathname === '/' ? 'active' : ''}`} href={'/'}>Home</Link>
            </li>
            <li>
                <Link className={`${pathname === '/profile' ? 'active' : ''}`} href={'/profile'}>Profile</Link>
            </li>
            <li>
                <Link className={`${pathname === '/goals' ? 'active' : ''}`} href={'/goals'}>Goals</Link>
            </li>
            <li>
                <Link className={`${pathname === '/workouts' ? 'active' : ''}`} href={'/workouts'}>Workouts</Link>
            </li>
            <li>
                <Link className={`${pathname === '/rankings' ? 'active' : ''}`} href={'/rankings'}>Rankings</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Nav