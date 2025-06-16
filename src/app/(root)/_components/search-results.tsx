"use client"
import { searchStore } from '@/stores/search-store'
import { ArrowDown } from 'lucide-react';
import React, { useState } from 'react'
import {AnimatePresence, motion, useAnimationControls} from 'framer-motion'
import { chatStore } from '@/stores/chat-store';
import { api } from '@/actions/api';
import { useSession } from '@/lib/auth-client';
import { publicuser } from '@/query-types/prisma.query.type';
import { useRouter } from 'next/navigation';

const SearchResults = () => {
    const {results, IsLoading, reset} = searchStore();
    const router = useRouter()
    const {getChatByEmail,addChat} = chatStore();
    const {data} = useSession()
    const  [open ,setOpen] = useState(true);
    const triggerControl = useAnimationControls();
    const divControl = useAnimationControls();
    const [disableCard,setDisableCard] = useState(false);
    const HandleClick = ()=>{
        if(open){
            triggerControl.start({
                rotate:0
            });
            divControl.start({
                height: 'auto'
            });
        }
        else{
                  triggerControl.start({
                rotate:180
            });
                  divControl.start({
                height: 0
            });
        }
                setOpen(!open)


    };
    const HandleCardClick =async ({email,name,image}:publicuser)=>{
        if(!data || disableCard) return;
        const existing_chat = getChatByEmail(email);
        if(existing_chat){
            router.push('/chats/'+existing_chat.id)
        }
        else {
            setDisableCard(true)
            router.push('/chats/loading')
        const new_chat = await api.AddChat(email);
        if(!new_chat.error && new_chat.chat) {
        const chat = {
            ...new_chat.chat,
            Sender: {
                email:data.user.email,
                name:data.user.name,
                image:data.user.image||null
            },
            Reciever: {email,name,image:image||null}
        };
        addChat(chat);
        reset()
        router.push('/chats/'+chat.id);
        }
        else{
            alert('something went wrong try again')
        }
        setDisableCard(false);
        }
    }
if(IsLoading)
    return(
        <div className='px-2 flex flex-col gap-2'>
            <div className='w-full h-[60px] bg-muted-foreground/10 animate-pulse rounded-xl '></div>
            <div className='w-full h-[60px] bg-muted-foreground/10 animate-pulse rounded-xl '></div>
            <div className='w-full h-[60px] bg-muted-foreground/10 animate-pulse rounded-xl '></div>
            <div className='w-full h-[60px] bg-muted-foreground/10 animate-pulse rounded-xl '></div>
        </div>
        )

if(results.length>0)
  return (
    <div className='p-2 flex flex-col gap-5 border-b overflow-hidden'>
        <div className="header flex items-center justify-between w-full">
            <h1 className='text-lg font-semibold'>
            Results
        </h1>
        <motion.button
        animate={triggerControl}
        onClick={HandleClick}
        className='p-2 hover:bg-muted-foreground/10 rounded-lg cursor-pointer'>
            <ArrowDown/>
        </motion.button>
        </div>
       <AnimatePresence

       >
         {open &&
         <motion.div 
         layout
         initial={{
            height:0,
            opacity:0
         }}
         animate={{
            height:'auto',
            opacity:1
         }}
         exit={{
            height:0,
            opacity:0
         }}
         className="cards flex flex-col gap-1 overflow-hidden" key={'search-results'}>
            {results.map((user)=>{
                return(
                    <React.Fragment key={user.email}>
                        <div 
                        onClick={()=>HandleCardClick(user)}
                        className='flex items-center hover:bg-muted-foreground/10 p-1 py-2 rounded-lg cursor-pointer gap-3'>
                            <img src={user.image!} className='w-10 h-10 rounded-full ' alt="user's profile image" />
                            <div className="info flex flex-col ">
                                <p>{user.name}</p>
                                <p className='text-xs text-muted-foreground'>{user.email}</p>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })}
        </motion.div>
         }
       </AnimatePresence>
    </div>
  )
}

export default SearchResults