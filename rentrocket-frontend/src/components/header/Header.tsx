'use client'
// import { useProfile } from '@/hooks/useProfile'
import { useAuth } from '../../app/[lang]/authContext';
import { URLS_PAGES } from '@/config/pages-url.config'
import { createLocalizedUrl } from '../../utils/utils'
import { LogoutButton } from '../ui/buttons/LogoutButton';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	Button,
} from "@heroui/react";
import Link from 'next/link';
import React, { useMemo } from "react";
import { Menu, X } from "lucide-react";

export const Header = React.memo(function Header({ lang, dictionary }: { lang: string; dictionary: Record<string, any> }) {
	const { isAuthenticated, profile, isProfileLoading } = useAuth();
	// const { data, isProfileLoading } = useProfile({ isAuthenticated });
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

				{isAuthenticated && !isProfileLoading && (
					<NavbarItem>
						<Link className='text-white' href={createLocalizedUrl(lang, URLS_PAGES.MYSPACE_FLATS)}>
							{dictionary.header.flats}
						</Link>
					</NavbarItem>
				)}

			</NavbarContent>
			{isAuthenticated && !isProfileLoading && (
				<>
				<Link className='text-white' href={createLocalizedUrl(lang, URLS_PAGES.MYSPACE)}>
					<div>{profile?.user?.name}</div>
				</Link>
				<LogoutButton dictionary={dictionary} />
				</>
			)}

			{(!isAuthenticated || isProfileLoading) && (
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
						>
							{item.label}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>

		</Navbar>


	)
})

