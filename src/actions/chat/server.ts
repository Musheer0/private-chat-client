"use server"
import { getServerAuth } from "@/lib/auth-server";
import prisma from "@/prisma";

export const AddChat = async(email:string)=>{
    if(!email) return {error:'email not found'}
    const session = await getServerAuth()
    if(!session?.user)  return {error:'unAuthorized'}
    const target = await prisma.user.findUnique({where:{
        email
    }});
    if(!target)  return {error:'invalid email'}
    const Exists = await prisma.friend.findFirst({
        where:{
            OR:[
                {
                    sender_id:session.user.id,
                    reciever_id:target.id
                },
                {
                    reciever_id:session.user.id,
                    sender_id:target.id
                }
            ]
        },
        select:{
            id:true,
            sender_id:true,
            reciever_id:true,
            createdAt:true,
                       updatedAt:true
        }
    });
    if(Exists) return {chat:Exists,error:null};
    try {
        const new_chat = await prisma.friend.create({
        data:{
            sender_id:session.user.id,
            reciever_id:target.id
        },
        select:{
              id:true,
            sender_id:true,
            reciever_id:true,
            createdAt:true,
            updatedAt:true,
         
        }
    
    });
    return {chat:new_chat,error:null};

    } catch (error) {
        console.log('add chat error', error);
         return {error:'error creating chat try again'}        
    }
};
export const getChat = async(lastChat?:Date|null)=>{
      const session = await getServerAuth();
      if(!session?.user)  return {error:'unAuthorized'}
    try {
        const chats = await prisma.friend.findMany({
            where:lastChat ?
            {
                  OR:[
                {
                    sender_id:session.user.id,
                },
                {
                    reciever_id:session.user.id,
                }
            ],
            updatedAt:{
                gte:lastChat
            }
            }:
            {
                  OR:[
                {
                    sender_id:session.user.id,
                },
                {
                    reciever_id:session.user.id,
                }
            ],
        
            }
            ,
            select:{
              id:true,
            sender_id:true,
            reciever_id:true,
            createdAt:true,
            updatedAt:true,
               Sender:{
                select:{
                    email:true,
                    name:true,
                    image:true
                }
            },
            Reciever:{
                
                select:{
                    email:true,
                    name:true,
                    image:true
                }
            }
        },
        orderBy:{
            updatedAt: 'desc'
        }
        });
        return {chats, error:null}
    } catch (error) {
        console.log(error,'get-user-chats error')
        return {error:'Internal server error'}
    }
}