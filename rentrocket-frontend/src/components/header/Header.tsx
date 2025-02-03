'use client'
import Image from 'next/image'
import Link from 'next/link'
import { COLORS } from '@/constants/color.constants'
import { MenuItem } from '@/components/menu/MenuItem'
import { MENU } from '@/components/menu/menu.data'
import { Roles } from '@/types/user.types'
import { RIGHTMENU } from '@/components/menu/menu.data'
import { useContext, useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile'
import { AuthContext } from '../../app/authContext';

export function Header() {
	const { data, isLoading } = useProfile();
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	const userRoles = data?.user?.roles || []; // Получаем роли пользователя

	return (
		<header className='bg-brandGray'>
			<div className='max-w-[1200px] mx-auto px-[30px]'>
				<div className='flex py-[10px] justify-between items-center'>
					<div>
						<Link href={'/'} className='text-white font-bold'>
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
						{MENU.filter(
							(item) => !item.access || item.access.some((role) => userRoles.includes(role))
						).map((item) => (
							<MenuItem key={item.id} item={item} />
						))}
					</div>

					{/* Правое меню для десктопов */}
					<div className='hidden md:flex md:items-center md:gap-6'>
						{RIGHTMENU.filter(
							(item) => !item.access || item.access.some((role) => userRoles.includes(role))
						).map((item) => (
							<MenuItem key={item.id} item={item} />
						))}
					</div>


				</div>
			</div>
		</header>
	)
}
