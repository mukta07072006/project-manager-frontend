import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    
    baseURL: "https://project-manager-frontend-bay.vercel.app"
})

export const { signIn, signUp, useSession } = createAuthClient()
