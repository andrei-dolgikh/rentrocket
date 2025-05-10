import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ICounter } from '@/types/counter.types'
import { URLS_PAGES } from '@/config/pages-url.config'
import { toast } from 'sonner'
import { counterService } from '@/services/counter.service'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../app/[lang]/languageContext'

export function useCreateCounter() {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { lang }: { lang: string } = useLanguage()

	const { mutate: createCounter, isPending } = useMutation({
		mutationKey: ['create counter'],
		mutationFn: (data: ICounter) => counterService.createCounter(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['counters']
			})
			router.push(`${URLS_PAGES.MYSPACE_FLATS_HK(lang)}`)
			toast.success('Счетчик добавлен!')
		}
	})

	return { createCounter, isPending }
}
