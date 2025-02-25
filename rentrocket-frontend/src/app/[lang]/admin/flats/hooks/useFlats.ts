import { useQuery } from '@tanstack/react-query'
import { flatService } from '@/services/flat.service'

export function useFlats() {
	const getFlatsCallback =  () => flatService.getFlats()
	const { data, isLoading : isFlatsLoading, isSuccess : isFlatsSuccess } = useQuery({
		queryKey: ['flats'],
		queryFn: () => getFlatsCallback()
	})

	const flats = data?.data

	return { flats, isFlatsLoading, isFlatsSuccess }
}
