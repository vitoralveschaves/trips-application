'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import { AiOutlineMenu } from 'react-icons/ai'

export const Header = () => {

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { status, data } = useSession()

  const handleLoginClick = () => signIn()
  const handleLogoutClick = () => {
    setMenuIsOpen(false)
    signOut()
  }
  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen)

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
      <div className="relative w-[183px] h-[32px]">
        <Image fill src={'/logo.png'} alt="logo" />
      </div>
      {status === 'unauthenticated' &&
        <button onClick={handleLoginClick} className="text-primary text-sm font-semibold">Login</button>
      }

      {status === 'authenticated' && data?.user &&
        <div className="flex items-center gap-4 border border-grayLighter p-2 px-3 rounded-full relative">
          <AiOutlineMenu size={22} onClick={handleMenuClick} className="cursor-pointer text-grayPrimary" />
          <Image height={32} width={32} src={data.user.image!} alt={data.user.name!} className="rounded-full shadow-md" />

          {menuIsOpen &&
            <div className="absolute top-14 left-0 w-full h-full bg-white rounded-md shadow-md flex flex-col justify-center items-center z-10">
              <button className="text-primary text-sm font-semibold" onClick={handleLogoutClick}>
                Logout
              </button>
            </div>
          }

        </div>
      }
    </div>
  )
}