'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

const ClientUserInfo = () => {
    const { data: session, status } = useSession();
    return (
        <div>
            <h1>
                Client User Component
            </h1>
            <p>
                {status} : {session?.user.username}
            </p>
        </div>
    )
}

export default ClientUserInfo