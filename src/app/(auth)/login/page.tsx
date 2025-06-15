"use client"
import { createAuthClient } from "better-auth/react"
import { Github, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useState } from 'react'

const page = () => {
    const {signIn} = createAuthClient();
    const [isLoading ,setIsloading] = useState(false);
    const handleClick = ()=>{
        setIsloading(true)
       return signIn.social({provider:"github"})
    }
  return (
    <div className="flex items-center  justify-center h-screen w-full flex-col ">
        <img src="/login-bg.png" className="absolute sm:opacity-100 opacity-40 top-0 left-0  
        w-full h-full 
        pointer-events-none
         blur-3xl mix-blend-screen" alt="login background image" />
        <div className="company flex sm:p-0 p-10 items-center gap-3 flex-col ">
           <div className="relative">
             <Image
            src={'/logo.svg'}
            width={40}
            height={40}
            alt="logo"
            />
            <img src="/logo.svg" className="absolute top-0 left-0 blur-xl" alt="logo-glow" />
           </div>
            <h1 className="text-4xl font-bold leading-none">Peer to Peer</h1>
        </div>
        <p className="leading-none text-muted-foreground text-xs">continue with your github account</p>
        <div className="div py-7 mt-auto sm:p-0 p-10 items-center justify-center gap-4 sm:py-3 flex-col sm:bg-transparent bg-background/60 sm:border-none border border-foreground/10 border-b-0 sm:backdrop-blur-none backdrop-blur-lg relative sm:rounded-none rounded-t-4xl sm:mt-0 w-full flex">
            <button 
            disabled={isLoading}
            onClick={handleClick}
            className="flex items-center mx-auto 
            cursor-pointer hover:opacity-80
            justify-center font-semibold gap-2 w-full shadow-md sm:max-w-[300px] py-4
             rounded-full bg-foreground text-background">
                {isLoading
                ?
                <Loader2Icon size={16} className="animate-spin"/>
                :
                <>
                Login with Github <Github size={15}/>
                </>
                }
                </button>
        <p className="text-sm text-muted-foreground">By creating an account you agress to our <span className="opacity-100 hover:underline cursor-pointer">terms and condtions</span></p>
        </div>
    </div>
  )
}

export default page