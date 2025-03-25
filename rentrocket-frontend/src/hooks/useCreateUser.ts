import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeUserForm } from '@/types/auth.types'

import { toast } from 'sonner'
import { userService } from '@/services/user.service'

export function useCreateUser() {
	const queryClient = useQueryClient()

	const { mutate: createUser } = useMutation({
		mutationKey: ['create user'],
		mutationFn: (data: TypeUserForm) => userService.createUser(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['users']
			})
			toast.success('Пользователь создан!')
		}
	})

	return { createUser }
}
