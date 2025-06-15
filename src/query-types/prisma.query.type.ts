import { Prisma } from "@prisma/client"

export type prismachatwihtuser = Prisma.FriendGetPayload<{
    include:{
        Sender:{
            select:{
                image:true,
                name:true,
                email:true,
            }
        },
        Reciever:{
            select:{
                image:true,
                name:true,
                email:true,
            }
        }
    }
}>
