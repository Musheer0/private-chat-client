"use client"
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/auth-client';
import { chatStore } from '@/stores/chat-store'
import { PhoneCallIcon, VideoIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const ChatHeader = ({id}:{id:string}) => {
    const {chats} = chatStore();
    const {data} = useSession()
    const chat =chats.find((c)=>c.id===id) ;
    const [user,setUser] = useState(chat?.Sender.email===data?.user.email ? chat?.Reciever :chat?.Sender);
    useEffect(()=>{
        setUser(chat?.Sender.email===data?.user.email ? chat?.Reciever :chat?.Sender)
    },[data,chat])
if(chat && user){
  return (
    <div className='chat-header w-full p-3 border-b flex items-center justify-between'>
        <div className="user flex items-center gap-2">
            <img src={user.image!} alt="user'profile image" className='w-10 rounded-full h-10' />
            <div className="info">
                <p className='text-xl font-bold'>{user.name}</p>
                <p className='text-muted-foreground'>typing...</p>            </div>
        </div>
        <div className="actions gap-2 flex items-center">
            <Button size={'icon'}>
                <PhoneCallIcon/>
            </Button>
            <Button size={'icon'}>
                <VideoIcon/>
            </Button>
        </div>
    </div>
  )}
}

export default ChatHeader