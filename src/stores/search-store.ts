import {  prismapublicuser } from '@/query-types/prisma.query.type';
import {create} from 'zustand'
type user = prismapublicuser
interface store{
    results:user[],
    addResults:(data:user[])=>void,
    reset:()=>void,
    IsLoading :boolean,
    setIsLoading :(data:boolean)=>void
}

export const searchStore = create<store>()(
(set, get) => ({
      results: [],
      IsLoading:false,
      addResults: (data) => {
        set({ results: [...data, ...get().results] });
      },
      reset:()=>{
        set({results:[],IsLoading:false});
      },
      setIsLoading:(data)=>{
        set({IsLoading:data});
      }
    }),
);