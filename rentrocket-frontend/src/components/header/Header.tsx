'use client'
import Link from 'next/link'
import { useContext } from 'react';
import { useProfile } from '@/hooks/useProfile'
import { AuthContext } from '../../app/[lang]/authContext';
import { URLS_PAGES } from '@/config/pages-url.config'

export function Header( { dictionary, lang }: { dictionary: any, lang: any } ) {
	const { data, isLoading } = useProfile();
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	const userRoles = data?.user?.roles || []; // Получаем роли пользователя

	return (
		<header className='bg-brandGray'>
			<div className='max-w-[1200px] mx-auto px-[30px]'>
				<div className='flex py-[10px] justify-between items-center'>
					<div>
						<Link href={lang + '/'} className='text-white font-bold'>
							RENT PULT
						</Link>
					</div>

					<div className='md:hidden cursor-pointer'>
						<label htmlFor='burger-toggle' className=' text-white'>
							<svg
								className='w-8 h-8'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16m-7 6h7'
								/>
							</svg>
						</label>
					</div>


					<div className='hidden md:flex md:items-center md:gap-6'>
						<Link href={lang + URLS_PAGES.HOME} className=''>
							<div className={`py-[5px] cursor-pointer`}>
								<div className='flex flex-col lg:pl-[30px]'>
									<div className="mt-[5px]">{dictionary.header.about}</div>
								</div>
							</div>
						</Link>
						<Link href={lang + URLS_PAGES.ADMIN_TAGS} className=''>
							<div className={`py-[5px] cursor-pointer`}>
								<div className='flex flex-col lg:pl-[30px]'>
									<div className="mt-[5px]">{dictionary.header.DUmap}</div>
								</div>
							</div>
						</Link>
						<Link href={lang + URLS_PAGES.AUTH} className=''>
							<div className={`py-[5px] cursor-pointer`}>
								<div className='flex flex-col lg:pl-[30px]'>
									<div className="mt-[5px]">{dictionary.header.dictionary}</div>
								</div>
							</div>
						</Link>
					</div>

					<div className='hidden md:flex md:items-center md:gap-6'>
						<Link href={lang + URLS_PAGES.AUTH} className=''>
							<div className={`py-[5px] cursor-pointer`}>
								<div className='flex flex-col lg:pl-[30px]'>
									<div className="mt-[5px]">{dictionary.header.login}</div>
								</div>
							</div>
						</Link>
					</div>


				</div>
			</div>
		</header>
	)
}
