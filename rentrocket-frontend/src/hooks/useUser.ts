import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'

export function useUser({ id }: { id: string }) {
	
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['user'],
		queryFn: () => userService.getUser(id)
	})

	const targetUser = data

	return { targetUser, isLoading, isSuccess }
}
