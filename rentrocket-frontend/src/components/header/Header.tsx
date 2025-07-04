'use client'
// import { useProfile } from '@/hooks/useProfile'
import { useAuth } from '../../app/[lang]/authContext';
import { URLS_PAGES } from '@/config/pages-url.config'
import { createLocalizedUrl } from '../../utils/utils'
import { LogoutButton } from '../buttons/LogoutButton';
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
			href: URLS_PAGES.MYSPACE_FLATS,
		},
		{
			label: dictionary.header.dictionary,
			href: URLS_PAGES.HELP,
		},
		{
			label: dictionary.header.flats,
			href: URLS_PAGES.MYSPACE_FLATS,
		},
	], [dictionary]);

	const pendingInvitations = profile?.user?.receivedInvitations?.filter((inv: any) => inv.status === 'PENDING');
	console.log('pendingInvitations', pendingInvitations)
	const pendingInvitationsCount = pendingInvitations?.length;

	return (
		<Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} position="static" className='bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 p-3 font-semibold'>
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
					<Link className='text-white' href={createLocalizedUrl(lang, URLS_PAGES.MYSPACE_FLATS)}>
						{dictionary.header.DUmap}
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link className='text-white' href={createLocalizedUrl(lang, URLS_PAGES.HELP)}>
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
					<Link className='text-white' href={createLocalizedUrl(lang, URLS_PAGES.PROFILE)}>
						<div className="relative flex items-center">
							{profile?.user?.name}
							
							{pendingInvitationsCount > 0 && (
								<div className="ml-2 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full h-5 min-w-5 px-1">
									{pendingInvitationsCount > 99 ? '99+' : pendingInvitationsCount}
								</div>
							)}
						</div>
					</Link>
					<LogoutButton dictionary={dictionary} />
				</>
			)}

			{(!isAuthenticated || isProfileLoading) && (
				<NavbarContent justify="end">
					<NavbarItem className="flex ">
						<Link color="primary" href={createLocalizedUrl(lang, URLS_PAGES.AUTH)}>{dictionary.header.login}</Link>
					</NavbarItem>
					<NavbarItem>
						<Button as={Link} color="secondary" href={createLocalizedUrl(lang, URLS_PAGES.REG)} variant="solid">
							{dictionary.header.registration}
						</Button>
					</NavbarItem>
				</NavbarContent>

			)}
			<StyledNavbarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`} className="py-2 hover:bg-blue-600/30 rounded-md transition-colors">
						<Link
							className="w-full flex items-center text-white font-medium px-3 py-2"
							href={createLocalizedUrl(lang, item.href)}
							onClick={() => setIsMenuOpen(false)}
						>
							{item.label}
						</Link>
					</NavbarMenuItem>
				))}
			</StyledNavbarMenu>

		</Navbar>


	)
})

const StyledNavbarMenu = ({ isOpen, children, onClose }: { isOpen: boolean, children: React.ReactNode, onClose: () => void }) => {
	return (
		<NavbarMenu className="bg-gradient-to-b from-blue-700 to-purple-800 mt-3 rounded-b-lg shadow-lg p-0 overflow-hidden z-50 opacity-100">
			{/* <div className="flex justify-end p-2">
				<Button
					className="bg-transparent min-w-0 p-1 hover:bg-blue-600/30 rounded-full"
					onClick={onClose}
				>
					<X className="h-6 w-6 text-white" />
				</Button>
			</div> */}
			<div className="px-4 py-3 space-y-4">
				{children}
			</div>
		</NavbarMenu>
	);
};