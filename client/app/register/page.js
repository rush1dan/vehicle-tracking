'use client'

import axios, { AxiosError } from "axios";
import { useState } from "react"
import { FetchStatus } from "@/lib/utils";
import StatusComponent from "@/components/Status";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const initialData = {
        username: '',
        email: '',
        password: ''
    }
    const [data, setData] = useState(initialData);
    const [fetchState, setFetchState] = useState(FetchStatus.none);
    const [errorMsg, setErrorMsg] = useState('');

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setFetchState(FetchStatus.pending);
        try {
            const res = await axios.post('/api/register', data);
            console.log(res.data);
            setFetchState(FetchStatus.success);
            router.push('/');
        } catch (error) {
            console.log("Error creating user. ", error);
            if (error instanceof AxiosError) {      //or use error.name === 'AxiosError'
                setErrorMsg(error.response.data);
                setFetchState(FetchStatus.error);
            } else {
                setErrorMsg(error.message);
                setFetchState(FetchStatus.error);
            }
        } finally {
            e.target.reset();
        }
    }

    if (fetchState !== FetchStatus.none) {
        if (fetchState == FetchStatus.pending) {
            return (
                <div className="h-screen w-full flex flex-col items-center justify-center">
                    <StatusComponent className={''} status={FetchStatus.pending} />
                </div>
            )
        }

        if (fetchState == FetchStatus.success) {
            return (
                <div className="h-screen w-full flex flex-col items-center justify-center">
                    <StatusComponent className={''} status={FetchStatus.success} />
                </div>
            )
        }

        if (fetchState == FetchStatus.error) {
            return (
                <div className="h-screen w-full flex flex-col items-center justify-center">
                    <StatusComponent className={''} status={FetchStatus.error} msg={errorMsg} />
                </div>
            )
        }
    }

    return (
        <div className='h-screen w-full'>
            <div className="-mt-10 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                UserName
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setData({ ...data, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
