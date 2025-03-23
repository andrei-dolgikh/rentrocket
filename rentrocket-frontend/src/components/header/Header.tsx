'use client'
import { useContext } from 'react';
import { useProfile } from '@/hooks/useProfile'
import { AuthContext } from '../../app/[lang]/authContext';
import { URLS_PAGES } from '@/config/pages-url.config'
import { createLocalizedUrl } from '../../utils/utils'
import { useLanguage } from '../../app/[lang]/languageContext';
import { LogoutButton } from '../ui/buttons/LogoutButton';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import React from "react";
export function Header() {
	const { data, isLoading } = useProfile();
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	const userRoles = data?.user?.roles || []; // Получаем роли пользователя
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);



	const menuItems = [
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
	  ];
	
	return (
		<Navbar onMenuOpenChange={setIsMenuOpen} position="static" className='bg-brandGray p-3 font-semibold'>
		<NavbarContent>
		  <NavbarMenuToggle
			aria-label={isMenuOpen ? "Close menu" : "Open menu"}
			className="sm:hidden"
		  />
		  <NavbarBrand>
			<Link href={createLocalizedUrl(lang, URLS_PAGES.HOME)} className='text-white font-bold'>
				RENT PULT
			</Link>
		  </NavbarBrand>
		</NavbarContent>

			  <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
						<div>{data?.user?.name}</div>
						<LogoutButton dictionary={dictionary}/>
						</>
					)}

					{(!isAuthenticated || isLoading) && (
						<NavbarContent justify="end">
						<NavbarItem className="hidden lg:flex ">
							<Link color="success" href={createLocalizedUrl(lang, URLS_PAGES.AUTH)}>{dictionary.header.login}</Link>
						</NavbarItem>
						<NavbarItem>
							<Button as={Link} color="success" href={createLocalizedUrl(lang, URLS_PAGES.REG)} variant="solid">
							{dictionary.header.registration}
							</Button>
						</NavbarItem>
						</NavbarContent>

					)}
						  <NavbarMenu>
							{menuItems.map((item, index) => (
							  <NavbarMenuItem key={`${item}-${index}`}>
								<Link
								  className="w-full"
								  color={
									index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
								  }
								  href={item.href}
								  size="lg"
								>
								  {item.label}
								</Link>
							  </NavbarMenuItem>
							))}
						  </NavbarMenu>

    	</Navbar>


		// <header className='bg-brandGray'>
		// 	<div className='max-w-[1200px] mx-auto px-[30px]'>
		// 		<div className='flex py-[10px] justify-between items-center'>
		// 			<div>
		// 				<Link href={createLocalizedUrl(lang, URLS_PAGES.HOME)} className='text-white font-bold'>
		// 					RENT PULT
		// 				</Link>
		// 			</div>

		// 			<div className='md:hidden cursor-pointer'>
		// 				<label htmlFor='burger-toggle' className=' text-white'>
		// 					<svg
		// 						className='w-8 h-8'
		// 						fill='none'
		// 						stroke='currentColor'
		// 						viewBox='0 0 24 24'
		// 						xmlns='http://www.w3.org/2000/svg'
		// 					>
		// 						<path
		// 							strokeLinecap='round'
		// 							strokeLinejoin='round'
		// 							strokeWidth='2'
		// 							d='M4 6h16M4 12h16m-7 6h7'
		// 						/>
		// 					</svg>
		// 				</label>
		// 			</div>


		// 			<div className='hidden md:flex md:items-center md:gap-6'>
		// 				<Link  href={createLocalizedUrl(lang, URLS_PAGES.INFO)} className=''>
		// 					<div className={`py-[5px] cursor-pointer`}>
		// 						<div className='flex flex-col lg:pl-[30px]'>
		// 							<div className="mt-[5px]">{dictionary.header.about}</div>
		// 						</div>
		// 					</div>
		// 				</Link>
		// 				<Link href={createLocalizedUrl(lang, URLS_PAGES.MYSPACE_TAGS)} className=''>
		// 					<div className={`py-[5px] cursor-pointer`}>
		// 						<div className='flex flex-col lg:pl-[30px]'>
		// 							<div className="mt-[5px]">{dictionary.header.DUmap}</div>
		// 						</div>
		// 					</div>
		// 				</Link>
		// 				<Link href={createLocalizedUrl(lang, URLS_PAGES.AUTH)} className=''>
		// 					<div className={`py-[5px] cursor-pointer`}>
		// 						<div className='flex flex-col lg:pl-[30px]'>
		// 							<div className="mt-[5px]">{dictionary.header.dictionary}</div>
		// 						</div>
		// 					</div>
		// 				</Link>

		// 				{isAuthenticated && !isLoading && (

		// 					<Link href={createLocalizedUrl(lang, URLS_PAGES.MYSPACE_FLATS)} className=''>
		// 						<div className={`py-[5px] cursor-pointer`}>
		// 							<div className='flex flex-col lg:pl-[30px]'>
		// 								<div className="mt-[5px]">{dictionary.header.flats}</div>
		// 							</div>
		// 						</div>
		// 					</Link>
		// 				)}
		// 			</div>


		// 			<div className='hidden md:flex md:items-center md:gap-6'>
		// 				{!isAuthenticated && !isLoading && (

		// 					<Link href={createLocalizedUrl(lang, URLS_PAGES.AUTH)} className=''>
		// 						<div className={`py-[5px] cursor-pointer`}>
		// 							<div className='flex flex-col lg:pl-[30px]'>
		// 								<div className="mt-[5px]">{dictionary.header.login}</div>
		// 							</div>
		// 						</div>
		// 					</Link>
		// 				)}
		// 				{isAuthenticated && !isLoading && (
		// 					<>
		// 					<div>{data?.user?.name}</div>
		// 					<LogoutButton dictionary={dictionary}/>
		// 					</>
		// 				)}
		// 			</div>


		// 		</div>
		// 	</div>
		// </header>
	)
}

