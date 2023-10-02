import './globals.css'
import { Inter } from 'next/font/google'
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
					{children}
				</ReduxProvider>
			</body>
		</html>
	)
}
