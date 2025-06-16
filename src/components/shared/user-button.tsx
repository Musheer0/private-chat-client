"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { signOut, useSession } from '@/lib/auth-client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { LogOutIcon, Settings2Icon } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
const UserButton = ({large}:{large?:boolean}) => {
    const {isPending, data} = useSession()
if(!isPending && data)
  return (
  <Popover>
  {large ?
   <>
   <div className='flex items-center w-full  justify-between  rounded-lg'>
    <Avatar className='w-[40px] h-[40px] shadow-sm'>
        <AvatarImage src={data.user.image!} />
        <AvatarFallback>{data.user.name.slice(0,2)}</AvatarFallback>
    </Avatar>
     <div className="text flex-1 pl-3 flex items-center justify-between">
      <div className="ifno">
        <p className='text-lg font-semibold leading-none'>{data.user.name}</p>
        <p className='text-xs text-muted-foreground leading-none'>{data.user.email}</p>
      </div>
       <PopoverTrigger className='cursor-pointer hover:bg-foreground/20 p-2 rounded-xl hover:scale-80 transition-all duration-300 '>
        <Settings2Icon/>
  </PopoverTrigger>
     </div>
   </div>
   </>  
   :
   <PopoverTrigger className='cursor-pointer hover:scale-80 transition-all duration-300 '>
      <Avatar>
        <AvatarImage src={data.user.image!}/>
        <AvatarFallback>{data.user.name.slice(0,2)}</AvatarFallback>
    </Avatar>
  </PopoverTrigger>
}
  <PopoverContent className='flex flex-col gap-2'>
   <div className="info flex items-center gap-2  py-2">
    <Avatar>
        <AvatarImage src={data.user.image!}/>
        <AvatarFallback>{data.user.name.slice(0,2)}</AvatarFallback>
    </Avatar>
     <div className="text flex-col flex">
        <p className=''>{data.user.name}</p>
    <p className='text-sm text-muted-foreground'>{data.user.email}</p>
     </div>
   </div>
    <Button
    onClick={()=>{
      signOut().then(()=>{
        window.location.reload();
      })
    }}
    className='w-full flex cursor-pointer hover:scale-95 transition-all duration-300 items-center bg-foreground/5 hover:bg-background/10 border text-red-600 justify-between'>Logout <LogOutIcon size={15}/></Button>
   <div className='flex items-center gap-2 w-full p-2 hover:bg-muted-foreground/5 rounded-lg border'>
    <ModeToggle/>
    <p>Set Theme</p>
   </div>
   <p className='text-xs text-muted-foreground/90 text-center pt-4'>logged in at {data.session.createdAt.toDateString()}</p>
    
    </PopoverContent>
</Popover>
  )
}

export default UserButton