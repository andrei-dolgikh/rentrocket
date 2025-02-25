import { useMutation, useQueryClient } from '@tanstack/react-query'

import { flatService } from '@/services/flat.service'

export function useDeleteFlat() {
	const queryClient = useQueryClient()

	const { mutate: deleteFlat, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete flat'],
		mutationFn: (id: string) => flatService.deleteFlat(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['flats']
			})
		}
	})

	return { deleteFlat, isDeletePending }
}
