import authOptions from '@/app/api/auth/[...nextauth]/options'
import ClientUserInfo from '@/components/ForAuth/ClientUserInfo';
import { getServerSession } from 'next-auth'
import React from 'react'

const UserPage = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div>
            <h1>Server User Component</h1>
            <p>{JSON.stringify(session)}</p>
            <ClientUserInfo />
        </div>
    )
}

export default UserPage