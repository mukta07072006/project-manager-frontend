'use client'
import { redirect } from "next/navigation"
import { useState } from "react";
import { authClient } from "./lib/auth-client";

export default function Home() {

  const [isHome , setIsHome]= useState(true)

  const {
            data: session,
            isPending, //loading state
            refetch
        } = authClient.useSession()
  
  
        if (!session){
          redirect('/signin')
      }
      else {
        redirect('/dashboard')
      }



  return (

    
    <>
    
    
    </>
  );
}
