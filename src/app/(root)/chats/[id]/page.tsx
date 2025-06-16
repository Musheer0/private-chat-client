import React from 'react'
import ChatHeader from '../../_components/chat-header'
import ChatInput from '../../_components/chat-input'
interface props {
    id:string
}
const page = async({params}:{params:Promise<props>}) => {
    const {id} =await params
  return (
    <div className='flex flex-1 flex-col h-full'>
        <ChatHeader id={id}/>
        <div className="body flex-1 w-full bg-red-500/10"></div>
        <ChatInput id={id}/>
    </div>
  )
}

export default page