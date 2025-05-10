import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useLanguage } from '../../app/[lang]/languageContext';
import { ICounter } from '@/types/counter.types'

import { counterService } from '@/services/counter.service'

export function useUpdateCounter(key?: string) {
	const {  dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
	const queryClient = useQueryClient()

	const { mutate: updateCounter, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update counter', key],
		mutationFn: ({ id, data }: { id: string; data: ICounter }) =>
			counterService.updateCounter(id, data),
		onSuccess() {
			toast.success(dictionary.hooks.useUpdateCounterDone)
			queryClient.invalidateQueries({ queryKey: ['counters'] })
		}
	})

	return { updateCounter, isUpdatePending }
}
