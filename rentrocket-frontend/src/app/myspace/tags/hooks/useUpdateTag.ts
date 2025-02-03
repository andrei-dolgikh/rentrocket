import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TypeTagForm } from '@/types/tag.types'
import { tagService } from '@/services/tag.service'
import { URLS_PAGES } from '@/config/pages-url.config'
import { useRouter } from 'next/navigation'

export function useUpdateTag(key?: string) {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { mutate:updateTag, isPending } = useMutation({
		mutationKey: ['update tag', key],
		mutationFn: ({ id, data }: { id: string; data: TypeTagForm }) => 
			tagService.updateTag(id, data),
		onSuccess(updatedTag) {
			queryClient.setQueryData(['tags', key], updatedTag)
			queryClient.invalidateQueries({
				queryKey: ['tags']
			})
			toast.success('Тег обновлен!')
			router.push(URLS_PAGES.ADMIN_TAGS)
		}
	})

	return { updateTag, isPending }
}
