
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { SITE_NAME } from '@/constants/seo.constants'
import './globals.scss'
import { Providers } from './providers'
import { Footer } from '@/components/footer/Footer'
import { AuthProvider } from './authContext';
import { HeroUIProvider } from "@heroui/react";
import { getDictionary } from './dictionaries'
import { LanguageProvider } from './languageContext';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Rent rocket',
}


export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ lang: "en" | "ru"  }>
}>) {
	const { lang } = await params
	const dictionary = await getDictionary(lang)

	return (
		<html lang={lang} className="">
			<body style={{ fontFamily: '"Avenir Next", sans-serif' }} className="" >
				<HeroUIProvider>
					<Providers>
						<LanguageProvider lang={lang} dictionary={dictionary}>
							<AuthProvider>
								<ClientLayout>
								{children}
								</ClientLayout>
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
