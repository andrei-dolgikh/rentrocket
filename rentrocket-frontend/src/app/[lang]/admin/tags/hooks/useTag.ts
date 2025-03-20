import { useQuery } from '@tanstack/react-query'
import { tagService } from '@/services/tag.service'

export function useTag({ id }: { id: string }) {
	
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['tag'],
		queryFn: () => tagService.getTag(id)
	})

	const targetTag = data

	return { targetTag, isLoading, isSuccess }
}
