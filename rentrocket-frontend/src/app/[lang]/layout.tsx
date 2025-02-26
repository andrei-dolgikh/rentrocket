
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { SITE_NAME } from '@/constants/seo.constants'
import './globals.scss'
import { Providers } from './providers'
import { Footer } from '@/components/footer/Footer'
import { AuthProvider } from './authContext';
import {NextUIProvider} from "@nextui-org/react";
import {Header} from "@/components/header/Header";
import { getDictionary } from './dictionaries'




export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Rent rocket',
}



export default async function RootLayout({
	children,
	params: { lang },
}: Readonly<{
	children: React.ReactNode
	params: { lang: "en" | "ru" }
}>) {
	const dictionary = await getDictionary(lang)

	return (
		<html lang='ru' className="">
			<body style={{ fontFamily: '"Avenir Next", sans-serif' }} className="" >
			<NextUIProvider>
				<Providers>
				<AuthProvider>
					<Header dictionary={dictionary} lang={lang} />
					{children}
					<Toaster
						theme='dark'
						position='bottom-right'
						duration={1500}
					/>
					<Footer />
					</AuthProvider>
				</Providers>
			</NextUIProvider>
			</body>
		</html>

	)
}
