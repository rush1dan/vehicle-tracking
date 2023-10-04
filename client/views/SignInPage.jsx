'use client'

import { signIn } from 'next-auth/react'
import { useEffect } from 'react';

const SignInPage =  () => {
    useEffect(() => {
        async function gotoSignIn() {
            await signIn();
        }
        gotoSignIn();
    }, [])

    return null;
}

export default SignInPage