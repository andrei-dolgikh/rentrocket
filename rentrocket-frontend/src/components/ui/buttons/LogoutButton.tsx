'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useContext } from 'react'
import { authService } from '@/services/auth.service'
import { AuthContext } from '../../../app/[lang]/LanguageContext';

export function LogoutButton() {
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

	const router = useRouter()
    const [menuVariation, setMenuVariation, isLoading] = useLocalStorage<string>({
        key: 'menuVariation',
        defaultValue: 'client'
    })


	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
        onSuccess: () => {
			setIsAuthenticated(false);
            // setMenuVariation('client');
            router.push('/');
			// router.refresh()
        },
	})

	return (
		<div className='ml-3  cursor-pointer'>
			<button
				className='flex'
                onClick={() => {
                    setMenuVariation('client');
                    mutate();
                }}
			>
			<LogOut size={20} /> 
			<div className='ml-1 hidden lg:block'> Выход</div>
			</button>
		</div>
	)
}
