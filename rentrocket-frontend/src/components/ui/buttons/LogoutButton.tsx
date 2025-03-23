'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { authService } from '@/services/auth.service'
import { AuthContext } from '../../../app/[lang]/authContext';
import {
	Link,
	Button,
} from "@heroui/react";

export function LogoutButton({ dictionary }: { dictionary: Record<string, any> }) {
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
		<Button
			onPress={() => {
				mutate();
			}}

			color="danger" variant="solid">
			{dictionary.header.exit}
		</Button>
	)
}
