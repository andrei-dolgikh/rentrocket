import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TypeUserForm } from '@/types/user.types'
import { userService } from '@/services/user.service'

export function useUpdateUser(key?: string) {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['update user', key],
		mutationFn: ({ id, data }: { id: string; data: TypeUserForm }) => 
			userService.updateUser(id, data),
		onSuccess(updatedUser) {
			queryClient.setQueryData(['users', key], updatedUser)
			queryClient.invalidateQueries({
				queryKey: ['users']
			})
			toast.success('Настройки пользователя обновлены!')
		}
	})

	return { mutate, isPending }
}
