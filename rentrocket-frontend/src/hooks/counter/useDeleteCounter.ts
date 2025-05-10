import { useMutation, useQueryClient } from '@tanstack/react-query'

import { counterService } from '@/services/counter.service'

export function useDeleteCounter() {
	const queryClient = useQueryClient()

	const { mutate: deleteCounter, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete counter'],
		mutationFn: (id: string) => counterService.deleteCounter(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['counters']
			})
		}
	})

	return { deleteCounter, isDeletePending }
}
