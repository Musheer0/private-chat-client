"use client"
import { api } from '@/actions/api';
import { useSession } from '@/lib/auth-client';
import { chatStore } from '@/stores/chat-store'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Chats = () => {
  const {chats,initializeChat} = chatStore();
  const[initialized, setInitialized] = useState(false);
  const InitializeChat = async()=>{
    if(initialized) return;
    console.log('fetching...')
    const user_chats = await api.getChat();
    if(user_chats.error) {}
    if(user_chats.chats) {
      initializeChat(user_chats.chats);
      console.log('done')
    }
    setInitialized(true)
  };
  useEffect(()=>{
    InitializeChat()
  },[initialized])
  const {data} = useSession();
  const router = useRouter()
if(data)
  return (
    <div className='flex flex-col gap-2 w-full'>
     {chats.map((chat)=>{
      const user = chat.Sender.email===data.user.email ? chat.Reciever :chat.Sender;
      return(
        <React.Fragment key={chat.id}>
           <div 
           onClick={()=>router.push('/chats/'+chat.id)}
           className="chat-card flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted-foreground/5 border-b">
       <div className="user relative">
        <div className="status absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
         <img src={user.image!} alt="user profile img"  className='w-10 h-10 bg-red-500 rounded-full object-cover'/>
       </div>
        <div className="info">
          <p className='font-semibold'>{user.name} </p>
          <p className='text-muted-foreground text-xs'>{user.email}</p>
        </div>
      </div>
        </React.Fragment>
      )
     })}
    </div>
  )
}

export default Chats