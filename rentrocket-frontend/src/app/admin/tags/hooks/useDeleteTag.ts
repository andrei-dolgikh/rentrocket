import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tagService } from '@/services/tag.service'

export function useDeleteTag() {
	const queryClient = useQueryClient()

	const { mutate: deleteTag, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete tag'],
		mutationFn: (id: string) => tagService.deleteTag(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tags']
			})
		}
	})

	return { deleteTag, isDeletePending }
}
