import { useQuery } from '@tanstack/react-query'


import { flatService } from '@/services/flat.service'

export function useFlat(id: string) {
	const { data, isLoading : isFlatLoading, isSuccess : isFlatSuccess } = useQuery({
		queryKey: ['flat'],
		queryFn: () => flatService.getById(id)
	})
	
	const flat = data?.data
	return { flat, isFlatLoading, isFlatSuccess }
}




