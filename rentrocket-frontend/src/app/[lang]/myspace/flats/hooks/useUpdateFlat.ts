import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useLanguage } from '../../../../../app/[lang]/languageContext';
import { IFlatUpdateRequest } from '@/types/flat.types'

import { flatService } from '@/services/flat.service'

export function useUpdateFlat(key?: string) {
	const {  dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
	const queryClient = useQueryClient()

	const { mutate: updateFlat, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update flat', key],
		mutationFn: ({ id, data }: { id: string; data: IFlatUpdateRequest }) =>
			flatService.updateFlat(id, data),
		onSuccess() {
			toast.success(dictionary.hooks.useUpdateFlatDone)
			queryClient.invalidateQueries({ queryKey: ['flats'] })
		}
	})

	return { updateFlat, isUpdatePending }
}
