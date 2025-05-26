import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IFlatPayment } from '@/types/flatPayment.types'
import { URLS_PAGES } from '@/config/pages-url.config'
import { toast } from 'sonner'
import { flatPaymentService } from '@/services/flatPayment.service'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../app/[lang]/languageContext'

export function useCreateFlatPayment() {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { lang }: { lang: string } = useLanguage()

	const { mutate: createFlatPayment, isPending } = useMutation({
		mutationKey: ['create flatPayment'],
		mutationFn: ({ id, data }: { id: string, data: IFlatPayment}) => flatPaymentService.createFlatPayment(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['flatPayments']
			})
			router.refresh()
			// router.push(`${URLS_PAGES.MYSPACE_FLATS_HK(lang)}`)
			toast.success('Счетчик добавлен!')
		}
	})

	return { createFlatPayment, isPending }
}
