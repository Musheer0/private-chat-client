"use client"
import { createAuthClient } from "better-auth/react"
import { ArrowRight, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useState } from 'react'

const Page = () => {
    const {signIn} = createAuthClient();
    const [isLoading ,setIsloading] = useState(false);
    const handleClick = ()=>{
        setIsloading(true)
       return signIn.social({provider:"github"})
    }
  return (
    <div className="flex bg-[#60FBA1] sm:bg-zinc-100 overflow-hidden items-center  justify-center h-[100dvh] w-full flex-col ">
        <div className="logo relative">
          <div className="company absolute top-0 left-1/2 -translate-x-1/2 p-5 flex items-center gap-2">
            <Image src={'logo.svg'} width={35} height={35} alt="logo"/>
            <p className="font-bold text-nowrap text-zinc-900">Private Chat</p>
          </div>
                <img src="/onboard.png" alt="loging screen" className="rounded-2xl max-w-[600px] p-2"/>

        </div>
          <div className="div py-20 text-zinc-900 mt-auto  sm:p-0 p-10  items-center justify-center gap-4 sm:py-3 flex-col sm:bg-transparent relative overflow-hidden  sm:rounded-none sm:mt-0  flex">
          <h1 className="text-3xl relative max-w-lg font-bold text-center ">
            Ready to talk? It&apos;s just you, them, and a private call.
          </h1>
            <button 
            disabled={isLoading}
            onClick={handleClick}
            className="flex relative items-center mx-auto 
            cursor-pointer hover:opacity-80
            justify-center font-semibold gap-2 p-4 shadow-md spy-4
             rounded-2xl bg-zinc-900 text-zinc-100">
                {isLoading
                ?
                <Loader2Icon size={16} className="animate-spin"/>
                :
                <>
                <span className="hiddent sm:flex">Continue to Private chat</span> <ArrowRight/>
                </>
                }
                </button>
        <p className="text-sm text-center hidden sm:flex text-muted-foreground">By creating an account you agress to our<span className="opacity-100 hover:underline cursor-pointer"> terms and condtions</span></p>
        </div>
    </div>
  )
}

export default Page