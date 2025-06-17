import React from 'react'
import ChatHeader from '../../_components/chat-header'
import ChatInput from '../../_components/chat-input'
import ChatBody from '../../_components/chat-body'
interface props {
    id:string
}
const page = async({params}:{params:Promise<props>}) => {
    const {id} =await params
  return (
    <div className='flex flex-1 flex-col h-full'>
        <ChatHeader id={id}/>
        <ChatBody id={id}/>
        <ChatInput id={id}/>
    </div>
  )
}

export default page