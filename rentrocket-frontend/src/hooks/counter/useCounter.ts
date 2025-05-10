import { useQuery } from '@tanstack/react-query'


import { counterService } from '@/services/counter.service'

export function useCounter(id: string) {
	const { data, isLoading : isCounterLoading, isSuccess : isCounterSuccess } = useQuery({
		queryKey: ['counters', id],
		queryFn: () => counterService.getById(id)
	})
	
	const counter = data?.data
	return { counter, isCounterLoading, isCounterSuccess }
}




