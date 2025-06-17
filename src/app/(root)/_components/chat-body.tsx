"use client"
import { api } from '@/actions/api';
import {motion} from 'framer-motion'
import { cn } from '@/lib/utils';
import { useMessageStore } from '@/stores/chat-message-store';
import React, { useEffect, useState } from 'react'

const ChatBody = ({id}:{id:string}) => {
  const [isLoadind ,setIsloading] = useState(false);
  const {messages,addMessages,id:chat_id,setId,reset} = useMessageStore()
  const [cursor ,setCursor] = useState<string|null>(null);
  const LoadMessages = async()=>{
    setIsloading(true);
    if(id!==chat_id) {
        reset();
        setId(id);
    }
    const response = await api.getMessage(id,cursor);
    if(response.error) {
        //TODO TOAST
    };
    if(response.messages){
        addMessages(response.messages.reverse());
        setCursor(response.nextCursor);
    }
    setIsloading(false);
  };
useEffect(()=>{
    LoadMessages()
},[])  

if(isLoadind)
    return (
  <div className=' flex-1 w-ful flex-col gap-2'>
        {[1,2,3,4,5,6,7].map((i)=>{
            return(
                <React.Fragment key={i}>
                    <div className="w-1/2 h-10 rounded-lg bg-muted-foreground/1- animate-pulse">
                    </div>
                </React.Fragment>
            )
        })}
    </div>
)

  return (
    <div className=' flex-1 w-ful flex-col p-2 gap-2'>
        {messages.length===0 && <p className='text-center py-10 text-muted-foreground'>No message yet...</p>}
        {messages.map((msg)=>{
            return(
                <React.Fragment key={msg.id}>
                   
                    <motion.div
                    initial={{
                        opacity:0,
                        filter: 'blur(10px)',

                    }}
                    animate={{
                        opacity:1,
                        filter: 'blur(0px)',
                    }}
       
                    >
                        <div className={
                      cn(
                          'px-6 py-3 rounded-2xl w-fit max-w-[65%] ',
                        msg.sentbyyou ? 'bg-muted-foreground/20 ml-auto rounded-br-none':'bg-primary mr-auto text-white rounded-bl-none',
                      )
                    }>
                        {msg.content}
                    </div>
                     <p
                    className={
                      cn(
                        msg.sentbyyou ? ' ml-auto ':' mr-auto ',
                        'w-fit text-xs text-muted'
                      )
                    }
                    >
                        {msg.createdAt.getHours()>12 ? msg.createdAt.getHours()-12:msg.createdAt.getHours()}:
                        {msg.createdAt.getMinutes().toString().padStart(2,'0')}
                         {msg.createdAt.getHours()>12 ? 'PM':'AM'}
                         </p>
                    </motion.div>
                </React.Fragment>
            )
        })}
    </div>
  )
}

export default ChatBody