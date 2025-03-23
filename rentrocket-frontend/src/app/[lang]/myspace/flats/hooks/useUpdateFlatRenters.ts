import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useLanguage } from '../../../../[lang]/languageContext'
import { flatService } from '@/services/flat.service'

export function useUpdateFlatRenters(flatId: string) {
  const { dictionary }: { dictionary: Record<string, any> } = useLanguage()
  const queryClient = useQueryClient()

  const { mutate: updateRenters, isPending } = useMutation({
    mutationKey: ['update flat renters', flatId],
    mutationFn: (renterIds: string[]) => 
      flatService.updateFlatRenters(flatId, renterIds),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['flats', flatId] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(dictionary?.hooks?.updateRentersSuccess || 'Renters updated successfully')
    }
  })

  return { updateRenters, isPending }
}