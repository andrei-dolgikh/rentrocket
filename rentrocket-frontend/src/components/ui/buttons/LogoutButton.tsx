'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'
import {  useAuth } from '../../../app/[lang]/authContext';
import {
	Button,
} from "@heroui/react";

export function LogoutButton({ dictionary }: { dictionary: Record<string, any> }) {
	const { setIsAuthenticated } = useAuth();

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
		<Button
			onPress={() => {
				mutate();
			}}

			color="danger" variant="solid">
			{dictionary.header.exit}
		</Button>
	)
}
