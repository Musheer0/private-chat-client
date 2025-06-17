"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import UserButton from '@/components/shared/user-button'
import SearchBar from './search-bar'
import Chats from './chats'
import SearchResults from './search-results'

const SideBar = () => {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 740) 
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const shouldHide =
    isMobile &&
    (pathname.match(/^\/chats\/[^/]+$/) || pathname === '/chats/loading')

  if (shouldHide) return null

  return (
    <aside className='sm:max-w-[350px] border-r py-2 w-full'>
      <div className="header p-2 px-4 flex-col flex">
        <UserButton large />
      </div>
      <SearchBar />
      <SearchResults />
      <Chats />
    </aside>
  )
}

export default SideBar
