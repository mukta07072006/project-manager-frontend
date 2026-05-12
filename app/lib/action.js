

'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteUser = async(userId) => {
    const res = await fetch(`https://project-manager-server-wev3.onrender.com/recentflows/${userId}`, {
        method: 'DELETE'
    });
    const data = await res.json()
    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export const addtask = async(FormData)=>{
    const newTask = Object.fromEntries(FormData.entries())
    const res = await fetch('https://project-manager-server-wev3.onrender.com/recentflows' , {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(newTask)
    })
    const data =await res.json()
    revalidatePath('/dashboard')
    redirect('/dashboard');
}
