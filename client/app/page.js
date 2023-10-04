import Topbar from '@/components/Topbar'
import Sidebar from '@/components/Sidebar'
import PageLoader from "@/views/PageLoader"
import { getServerSession } from 'next-auth'
import authOptions from './api/auth/[...nextauth]/options'
import SignInPage from '@/views/SignInPage'


export default async function Home() {
	const session = await getServerSession(authOptions);
	if (!session) {
		return <SignInPage />
	}
	return (
		<main className="w-full h-full">
			<Topbar className={'w-screen h-16'} />
			<div className='h-[calc(100vh-4rem)] w-full overflow-hidden'>
				<div className='w-full h-full flex flex-row items-center justify-start'>
					<Sidebar className={'lg:w-32 md:w-28 w-32 h-full'} />
					<div className='lg:w-[calc(100%-8rem)] md:w-[calc(100%-7rem)] w-full h-full'>
						<PageLoader className='w-full h-full' />
					</div>
				</div>
			</div>
		</main>
	)
}
