import { Loader2Icon } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-1 flex-col gap-2 items-center justify-center'>
        <div className="header w-full h-20 bg-muted-foreground/10 animate-pulse"></div>
        <div className="body w-full flex-1 bg-muted-foreground/10 animate-pulse flex flex-col items-center justify-center">
            <Loader2Icon className='animate-spin'/>
        <p className='text-xs text-muted-foreground'>Loading chat please wait...</p>
        </div>
            <div className="input w-full h-20 bg-muted-foreground/10 animate-pulse"></div>
    
    </div>
  )
}

export default page