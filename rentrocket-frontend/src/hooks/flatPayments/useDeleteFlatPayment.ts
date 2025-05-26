import { useMutation, useQueryClient } from '@tanstack/react-query'

import { flatPaymentService } from '@/services/flatPayment.service'

export function useDeleteFlatPayment() {
	const queryClient = useQueryClient()

	const { mutate: deleteFlatPayment, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete flatPayment'],
		mutationFn: (id: string) => flatPaymentService.deleteFlatPayment(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['flatPayments']
			})
		}
	})

	return { deleteFlatPayment, isDeletePending }
}
