import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TypeTagForm } from '@/types/tag.types'
import { tagService } from '@/services/tag.service'
import { useRouter } from 'next/navigation'

export function useUpdateTag(returnUrl: string, key?: string) {
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
			router.push(returnUrl)
		}
	})

	return { updateTag, isPending }
}
