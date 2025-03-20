import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { URLS_PAGES } from '@/config/pages-url.config'
import { IFlatUpdateRequest } from '@/types/flat.types'

import { flatService } from '@/services/flat.service'

export function useUpdateFlat(key?: string) {
	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutate: updateFlat, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update flat', key],
		mutationFn: ({ id, data }: { id: string; data: IFlatUpdateRequest }) =>
			flatService.updateFlat(id, data),
		onSuccess() {
			toast.success('Ресурс успешно обновлен!')
			queryClient.invalidateQueries({ queryKey: ['flats'] })
			// router.push(URLS_PAGES.ADMIN_RESOURCES)
		}
	})

	return { updateFlat, isUpdatePending }
}
