'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useContext } from 'react'
import { authService } from '@/services/auth.service'
import Link from 'next/link'
import { AuthContext } from '../../../app/[lang]/authContext';

export function LogoutButton( {dictionary} : {dictionary: Record<string, any>} ) {
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

	const router = useRouter()


	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
        onSuccess: () => {
			setIsAuthenticated(false);
            router.push('/');
			// router.refresh()
        },
	})

	return (

		<div className={`py-[5px] cursor-pointer`}>
			<div className='flex flex-col lg:pl-[30px]' 
                onClick={() => {
                    mutate();
                }}>
				<div className="mt-[5px]">{dictionary.header.exit}</div>
			</div>
		</div>
	)
}
