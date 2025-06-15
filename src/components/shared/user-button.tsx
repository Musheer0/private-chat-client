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
import { LogOutIcon } from 'lucide-react'
const UserButton = () => {
    const {isPending, data} = useSession()
if(!isPending && data)
  return (
  <Popover>
  <PopoverTrigger>
      <Avatar>
        <AvatarImage src={data.user.image!}/>
        <AvatarFallback>{data.user.name.slice(0,2)}</AvatarFallback>
    </Avatar>
  </PopoverTrigger>
  <PopoverContent>
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
    onClick={()=>signOut()}
    className='w-full flex items-center bg-foreground/5 hover:bg-background/10 border text-red-600 justify-between'>Logout <LogOutIcon size={15}/></Button>
    <p className='text-xs text-muted-foreground/90 text-center pt-4'>logged in at {data.session.createdAt.toDateString()}</p>
    
    </PopoverContent>
</Popover>
  )
}

export default UserButton