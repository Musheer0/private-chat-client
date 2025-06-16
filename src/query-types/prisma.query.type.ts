import { Prisma } from "@prisma/client"

export const friendQueryArgs = {
  select: {
    id: true,
    createdAt: true,
    sender_id:true,
    reciever_id:true
  },
  include: {
    Sender: {
      select: {
        image: true,
        name: true,
        email: true,
      },
    },
    Reciever: {
      select: {
        image: true,
        name: true,
        email: true,
      },
    },
  },
};
export const publicUser = {
  select:{
      image: true,
        name: true,
        email: true,
  }
}
export type prismapublicuser = Prisma.UserGetPayload<typeof publicUser>
export type prismachatwihtuser = Prisma.FriendGetPayload<typeof friendQueryArgs>;
export type publicuser = prismapublicuser