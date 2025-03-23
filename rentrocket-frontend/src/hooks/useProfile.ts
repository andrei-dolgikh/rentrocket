import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'

export function useProfile( { isAuthenticated }: { isAuthenticated: boolean } ) {
	
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		retry: 0,
		enabled: isAuthenticated,
		staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
		gcTime: 1000 * 60 * 30, // Время хранения в кэше (раньше называлось cacheTime)
		refetchOnMount: false,    // Не делать запрос при монтировании компонента
		refetchOnWindowFocus: false, // Не делать запрос при фокусе окна
	})

	return { data, isLoading, isSuccess }
}
