"use client"
import { useSearch } from '@/actions/search/client';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import React, { useState,useRef } from 'react'

const SearchBar = () => {
    const [query, SetQuery] = useState('');
    const {searchUser} = useSearch();
    const timeout = useRef<number|null>(null)
    const HandleSubmit = async(e:string)=>{
        const response = await searchUser(e);
       console.log(response);
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
      if(timeout.current!==null) clearTimeout(timeout.current);
      timeout.current = window.setTimeout(async()=>{
        SetQuery(e.target.value);
        await HandleSubmit(e.target.value);
      },500)
    }
  return (
    <div className='search-bar p-2 py-4 relative w-full'>
       <form
 
       >
         <Input
        defaultValue={query}
        onChange={handleChange}
        placeholder='Search your Friends'
        className='pl-8 py-3 rounded-full focus:bg-muted-foreground/10'
        />
       </form>
        <SearchIcon size={14} className='absolute top-1/2 -translate-y-1/2 text-muted-foreground left-5'/>
    </div>
  )
}

export default SearchBar