import { useMutation, useQueryClient } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export function useDeleteUser() {
	const queryClient = useQueryClient()

	const { mutate: deleteUser, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (id: string) => userService.deleteUser(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['users']
			})
		}
	})

	return { deleteUser, isDeletePending }
}
