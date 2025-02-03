import { useQuery } from '@tanstack/react-query'
import { flatService } from '@/services/flat.service'

export function useStatistics() {
	
	const { data, isLoading: isStatisticsLoading, isSuccess: isStatisticsSuccess } = useQuery({
		queryKey: ['statistics'],
		queryFn: () => flatService.getStatistics()
	})

	const statistics = {
		dashStat: data?.data?.dashStat,
		linksStat: data?.data?.linksStat
	}

	return { statistics, isStatisticsLoading, isStatisticsSuccess }
}
