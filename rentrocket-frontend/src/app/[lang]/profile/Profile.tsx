'use client'
import { useContext } from 'react';
import { LogoutButton } from '@/components/ui/buttons/LogoutButton'
import { useProfile } from '@/hooks/useProfile'
import { roleTranslations } from '@/types/user.types'
import Loader from '@/components/ui/Loader'
import { Chip } from "@heroui/chip";
import { CircleUser } from 'lucide-react'
import { AuthContext } from '../../../app/[lang]/authContext';
import { useLanguage } from '../../../app/[lang]/languageContext';

export function Profile() {
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
	const { data, isLoading, isSuccess } = useProfile({ isAuthenticated: isAuthenticated});

	return isLoading ? (
		<Loader />
	  ) : (
		(isSuccess && <div className="flex flex-col items-center mt-[140px] gap-5 mb-[140px] text-black">
			<div className="flex  justify-start text-[16px] lg:text-[24px] items-center mr-1">
				<CircleUser size={28} className='mr-2' />{data?.user.login} &nbsp;
				<span className='text-[12px] lg:text-[18px]'> ( @{data?.user.name} ) </span>
				
			</div>
			<div className="flex gap-3 justify-start text-[12px] items-center mr-[2rem] mb-10">
				{ data?.user?.roles.map((role) => (
					<Chip key={role} size="lg" radius="full"  color="primary">
					{roleTranslations[role]}
					</Chip>  
				))}
			</div>
			<div><LogoutButton dictionary={dictionary}/></div>
		</div>)
	)
}
