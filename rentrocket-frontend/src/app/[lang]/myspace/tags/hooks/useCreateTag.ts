import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeTagForm } from '@/types/tag.types'
import { toast } from 'sonner'
import { tagService } from '@/services/tag.service'
import { URLS_PAGES } from '@/config/pages-url.config'
import { useRouter } from 'next/navigation'

export function useCreateTag(returnUrl : string) {
	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutate: createTag, isPending: isCreatePending } = useMutation({
		mutationKey: ['create tag'],
		mutationFn: (data: TypeTagForm) => tagService.createTag(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tags']
			})
			toast.success('Тег создан!')
			router.push(returnUrl)
		}
	})

	return { createTag, isCreatePending }
}
