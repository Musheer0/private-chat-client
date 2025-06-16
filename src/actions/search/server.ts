"use server"

import { auth } from "@/auth";            // your BetterAuth instance
import prisma from "@/prisma";
import { headers } from "next/headers";

export const searchUser = async(query:string)=>{
    if(!query) return [];
  const session = await auth.api.getSession({
    headers: await headers()
  });
   if(!session?.user) return []
    const users = await prisma.user.findMany({where:{name:{
        contains:query,
        mode:"insensitive"
    },
     id: {not:session.user.id}
    },
    select:{
        email:true,
        name:true,
        image:true
    }
    });
    return users
}