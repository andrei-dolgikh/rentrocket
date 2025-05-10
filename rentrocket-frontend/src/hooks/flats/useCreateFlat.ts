import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IFlatCreateRequest } from '@/types/flat.types'
import { URLS_PAGES } from '@/config/pages-url.config'
import { toast } from 'sonner'
import { flatService } from '@/services/flat.service'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../app/[lang]/languageContext'

export function useCreateFlat() {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { lang }: { lang: string } = useLanguage()

	const { mutate: createFlat, isPending } = useMutation({
		mutationKey: ['create flat'],
		mutationFn: (data: IFlatCreateRequest) => flatService.createFlat(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['flats']
			})
			router.push(`${URLS_PAGES.MYSPACE_FLATS_HK(lang)}`)
			toast.success('Квартира добавлена!')
		}
	})

	return { createFlat, isPending }
}
