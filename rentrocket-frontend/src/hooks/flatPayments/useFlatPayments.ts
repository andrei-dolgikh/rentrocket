import { useQuery } from '@tanstack/react-query'
import { flatPaymentService } from '@/services/flatPayment.service'

export function useFlatPayments(flatId: string) {
	const getFlatPaymentsCallback =  () => flatPaymentService.getFlatPayments(flatId)
	const { data, isLoading : isFlatPaymentsLoading, isSuccess : isFlatPaymentsSuccess } = useQuery({
		queryKey: ['flatPayments'],
		queryFn: () => getFlatPaymentsCallback()
	})

	const flatPayments = data?.data

	return { flatPayments, isFlatPaymentsLoading, isFlatPaymentsSuccess }
}
