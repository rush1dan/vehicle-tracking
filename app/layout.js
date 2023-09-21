import Topbar from '@/components/Topbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import ReduxProvider from '@/components/ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Tracky',
	description: 'Realtime vehicle tracking app',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ReduxProvider>
					<Topbar className={'w-screen h-16'} />
					<div className='h-[calc(100vh-4rem)] w-full overflow-hidden'>
						<div className='w-full h-full flex flex-row items-center justify-start relative'>
							<Sidebar className={'lg:w-32 md:w-28 w-32 h-full'} />
							<div className='lg:w-[calc(100%-8rem)] md:w-[calc(100%-7rem)] w-full h-full'>
								{children}
							</div>
						</div>
					</div>
				</ReduxProvider>
			</body>
		</html>
	)
}
