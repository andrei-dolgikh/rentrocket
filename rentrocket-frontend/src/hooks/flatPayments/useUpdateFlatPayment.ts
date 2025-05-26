import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useLanguage } from '../../app/[lang]/languageContext';
import { IFlatPayment } from '@/types/flatPayment.types'

import { flatPaymentService } from '@/services/flatPayment.service'

export function useUpdateFlatPayment(key?: string) {
	const {  dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
	const queryClient = useQueryClient()

	const { mutate: updateFlatPayment, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update flatPayment', key],
		mutationFn: ({ id, data }: { id: string; data: IFlatPayment }) =>
			flatPaymentService.updateFlatPayment(id, data),
		onSuccess() {
			toast.success(dictionary.hooks.useUpdateFlatPaymentDone)
			queryClient.invalidateQueries({ queryKey: ['flatPayments'] })
		}
	})

	return { updateFlatPayment, isUpdatePending }
}
