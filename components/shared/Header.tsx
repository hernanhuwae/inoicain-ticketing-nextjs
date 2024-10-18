import { SignedIn, SignedOut, SignIn, useAuth, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { TiTicket } from 'react-icons/ti'
import { Button } from '../ui/button'
import NavbarTicket from './Navbar'
import NavbarMobileTicket from './NavbarMobile'

const Header = () => {
  
  return (
    <header className='w-full border-b'>
      <div className='flex items-center justify-between max-w-7xl lg:mx-auto md:px-10 xl:px-0 w-full'>
        <Link href={"/"} className='p-2 flex items-center'>
          <TiTicket size={50}/>
          <h1 className='text-[30px] font-semiboldo'>INOICAIN</h1>
        </Link>

        <SignedIn>
          <nav className='max-md:hidden'>
            <NavbarTicket/>
          </nav>
        </SignedIn>
        <div className='flex w-32 justify-end gap-3'>
          <SignedIn>
            <UserButton afterSignOutUrl='/'/>
            <NavbarMobileTicket/> 
          </SignedIn>
          <SignedOut>
            <Button className='rounded-full bg-[#001F3F] hover:bg-yellow-500' size="lg">
              <Link href={'/sign-in'}>Login</Link>
            </Button>
          </SignedOut>
        </div>
        
      </div>
    </header>
  )
}

export default Header