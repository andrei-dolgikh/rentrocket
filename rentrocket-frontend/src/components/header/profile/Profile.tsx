'use client'
import { useRef, useContext } from 'react';
import { GlobalLoader } from '@/components/header/GlobalLoader'
import { CircleUser, X } from 'lucide-react'
import { useProfile } from '@/hooks/useProfile'
import Link from 'next/link';

export function Profile() {
	const { data, isLoading } = useProfile();

	const ref = useRef<HTMLDivElement>(null);
	return isLoading ? (
		<GlobalLoader />
		) : (
		<div className="" ref={ref}>
				<Link href={'/profile'} className=''>
					<div className="">
						<div className={`h-min cursor-pointer`}>
							<div className='flex flex-col lg:pl-[30px]'>
								<div className="mt-[5px]">Профиль</div>
							</div>
						</div>
					</div>
				</Link>
		</div>
	);
}