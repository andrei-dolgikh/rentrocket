import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { IUserUpdateRequest } from '@/types/user.types'
import { userService } from '@/services/user.service'

export function useUpdateUser(key?: string) {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['update user', key],
		mutationFn: ({ id, data }: { id: string; data: IUserUpdateRequest }) => 
			userService.updateUser(id, data),
		onSuccess(updatedUser) {
			queryClient.setQueryData(['user', key], updatedUser)
			queryClient.invalidateQueries({
				queryKey: ['user']
			})
			toast.success('Настройки пользователя обновлены!')
		}
	})

	return { updateUser: mutate, isUpdateUserPending: isPending }
}
