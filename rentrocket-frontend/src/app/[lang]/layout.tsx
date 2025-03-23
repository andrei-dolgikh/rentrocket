
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { SITE_NAME } from '@/constants/seo.constants'
import './globals.scss'
import { Providers } from './providers'
import { Footer } from '@/components/footer/Footer'
import { AuthProvider } from './authContext';
import { HeroUIProvider } from "@heroui/react";
import { Header } from "@/components/header/Header";
import { getDictionary } from './dictionaries'
import { LanguageProvider } from './languageContext';

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
		<html lang={lang} className="">
			<body style={{ fontFamily: '"Avenir Next", sans-serif' }} className="" >
				<HeroUIProvider>
					<Providers>
						<LanguageProvider lang={lang} dictionary={dictionary}>
							<AuthProvider>
								<Header />
								<div className="mx-[30px] max-w-[1000px] lg:mx-auto lg:px-[30px] pb-[30px]">
									{children}
								</div>
								<Toaster
									theme='dark'
									position='bottom-right'
									duration={1500}
								/>
								<Footer />
							</AuthProvider>
						</LanguageProvider>
					</Providers>
				</HeroUIProvider>

			</body>
		</html>

	)
}
