'use client'
import { useProfile } from '@/hooks/useProfile'
import { useAuth } from '../../app/[lang]/authContext';
import { URLS_PAGES } from '@/config/pages-url.config'
import { createLocalizedUrl } from '../../utils/utils'
import { useLanguage } from '../../app/[lang]/languageContext';
import { LogoutButton } from '../ui/buttons/LogoutButton';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	Link,
	Button,
} from "@heroui/react";
import React, { useMemo } from "react";
import { Menu, X } from "lucide-react";


export function Header() {
	const { isAuthenticated } = useAuth();
	const { data, isLoading } = useProfile({ isAuthenticated });
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);



	const menuItems = useMemo(() => [
		{
		  label: dictionary.header.about,
		  href: URLS_PAGES.INFO,
		},
		{
		  label: dictionary.header.DUmap,
		  href: URLS_PAGES.MYSPACE_TAGS,
		},
		{
		  label: dictionary.header.dictionary,
		  href: URLS_PAGES.AUTH,
		},
		{
		  label: dictionary.header.flats,
		  href: URLS_PAGES.MYSPACE_FLATS,
		},
	  ], [dictionary]);

	return (
		<Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} position="static" className='bg-brandGray p-3 font-semibold'>
			<NavbarContent>
				<Button
					className="md:hidden bg-transparent min-w-0 p-0"
					onPress={() => setIsMenuOpen(!isMenuOpen)}
				>
					{isMenuOpen ? (
						<X className="h-6 w-6 text-white" />
					) : (
						<Menu className="h-6 w-6 text-white" />
					)}
				</Button>
				<NavbarBrand>
					<Link href={createLocalizedUrl(lang, URLS_PAGES.HOME)} className='text-white font-bold'>
						RENT PULT
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden md:flex gap-4" justify="center">
				<NavbarItem>
					<Link className='text-white' href={createLocalizedUrl(lang, URLS_PAGES.INFO)}>
						{dictionary.header.about}
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link className='text-white' href={createLocalizedUrl(lang, URLS_PAGES.MYSPACE_TAGS)}>
						{dictionary.header.DUmap}
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link className='text-white' href={createLocalizedUrl(lang, URLS_PAGES.AUTH)}>
						{dictionary.header.dictionary}
					</Link>
				</NavbarItem>

				{isAuthenticated && !isLoading && (
					<NavbarItem>
						<Link className='text-white' href={createLocalizedUrl(lang, URLS_PAGES.MYSPACE_FLATS)}>
							{dictionary.header.flats}
						</Link>
					</NavbarItem>
				)}

			</NavbarContent>
			{isAuthenticated && !isLoading && (
				<>
				<Link className='text-white' href={createLocalizedUrl(lang, URLS_PAGES.MYSPACE)}>
					<div>{data?.user?.name}</div>
				</Link>
				<LogoutButton dictionary={dictionary} />
				</>
			)}

			{(!isAuthenticated || isLoading) && (
				<NavbarContent justify="end">
					<NavbarItem className="flex ">
						<Link color="success" href={createLocalizedUrl(lang, URLS_PAGES.AUTH)}>{dictionary.header.login}</Link>
					</NavbarItem>
					<NavbarItem>
						<Button as={Link} color="success" href={createLocalizedUrl(lang, URLS_PAGES.REG)} variant="solid">
							{dictionary.header.registration}
						</Button>
					</NavbarItem>
				</NavbarContent>

			)}
			<NavbarMenu className='bg-brandGray z-10 p-3'>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							className="w-full text-white"
							href={createLocalizedUrl(lang, item.href)}
							size="lg"
						>
							{item.label}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>

		</Navbar>


	)
}

