import { useQuery } from '@tanstack/react-query'
import { counterService } from '@/services/counter.service'

export function useCounters() {
	const getCountersCallback =  () => counterService.getCounters()
	const { data, isLoading : isCountersLoading, isSuccess : isCountersSuccess } = useQuery({
		queryKey: ['counters'],
		queryFn: () => getCountersCallback()
	})

	const counters = data?.data

	return { counters, isCountersLoading, isCountersSuccess }
}
