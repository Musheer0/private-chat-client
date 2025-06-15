import UserButton from '@/components/shared/user-button'
import React from 'react'
import SearchBar from './search-bar'
import Chats from './chats'

const SideBar = () => {
  return (
    <aside className='sm:max-w-[350px] border-r  py-2 w-full'>
        <div className="header p-2 px-4  flex border-b items-center justify-between">
            <h1 className='text-2xl font-bold'>Your Chats</h1>
            <UserButton/>
        </div>
        <SearchBar/>
        <Chats/>
    </aside>
  )
}

export default SideBar