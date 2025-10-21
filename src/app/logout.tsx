"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

const Logout = () => {
    return (
        <Button onClick={() => authClient.signOut()}>Log Out</Button>
    )
}

export default Logout;