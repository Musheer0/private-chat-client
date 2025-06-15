import React from 'react'
import SideBar from './_components/sidebar'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='w-full h-screen flex '>
        <SideBar/>
        {children}
    </main>
  )
}

export default layout