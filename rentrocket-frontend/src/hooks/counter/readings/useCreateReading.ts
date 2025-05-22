import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IReading } from '@/types/counter.types'
import { toast } from 'sonner'
import { counterService } from '@/services/counter.service'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../app/[lang]/languageContext'

export function useCreateReading() {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { lang }: { lang: string } = useLanguage()

	const { mutate: createReading, isPending } = useMutation({
		mutationKey: ['create reading'],
		mutationFn: ({ id, data }: { id: string, data: IReading}) => counterService.createReading(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['reading']
			})
			router.refresh()
			// router.push(`${URLS_PAGES.MYSPACE_FLATS_HK(lang)}`)
			toast.success('Показания добавлены!')
		}
	})

	return { createReading, isPending }
}
