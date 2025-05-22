import { useMutation, useQueryClient } from '@tanstack/react-query'

import { counterService } from '@/services/counter.service'

export function useDeleteReading() {
	const queryClient = useQueryClient()

	const { mutate: deleteReading, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete reading'],
		mutationFn: (id: string) => counterService.deleteReading(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['reading']
			})
		}
	})

	return { deleteReading, isDeletePending }
}
