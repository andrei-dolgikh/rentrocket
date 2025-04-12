import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useLanguage } from '../../../languageContext'
import { flatService } from '@/services/flat.service'
import { IFlatUsersUpdateRequest} from '@/types/flat.types'

type UserRole = 'renter' | 'manager' | 'owner';
type UserOperation = 'add' | 'remove' | 'update';

export function useFlatUserManagement(flatId: string) {
  const { dictionary }: { dictionary: Record<string, any> } = useLanguage()
  const queryClient = useQueryClient()

  const handleSuccess = (operation: UserOperation, role: UserRole) => {
    queryClient.invalidateQueries({ queryKey: ['flats', flatId] })
    queryClient.invalidateQueries({ queryKey: ['users'] })
    
    const successMessages: Record<UserOperation, Record<UserRole, string>> = {
      add: {
        renter: dictionary?.hooks?.addRenterSuccess || 'Renter added successfully',
        manager: dictionary?.hooks?.addManagerSuccess || 'Manager added successfully',
        owner: dictionary?.hooks?.addOwnerSuccess || 'Owner added successfully'
      },
      remove: {
        renter: dictionary?.hooks?.removeRenterSuccess || 'Renter removed successfully',
        manager: dictionary?.hooks?.removeManagerSuccess || 'Manager removed successfully',
        owner: dictionary?.hooks?.removeOwnerSuccess || 'Owner removed successfully'
      },
      update: {
        renter: dictionary?.hooks?.updateRentersSuccess || 'Renters updated successfully',
        manager: dictionary?.hooks?.updateManagersSuccess || 'Managers updated successfully',
        owner: dictionary?.hooks?.updateOwnersSuccess || 'Owners updated successfully'
      }
    };
    
    toast.success(successMessages[operation][role]);
  }

  const { mutate: addRenter, isPending: isAddingRenter } = useMutation({
    mutationKey: ['add flat renter', flatId],
    mutationFn: (data: IFlatUsersUpdateRequest) => flatService.addRenter(flatId, data),
    onSuccess: () => handleSuccess('add', 'renter'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.addRenterError || 'Failed to add renter')
      console.error(error)
    }
  })

  const { mutate: removeRenter, isPending: isRemovingRenter } = useMutation({
    mutationKey: ['remove flat renter', flatId],
    mutationFn: (data: IFlatUsersUpdateRequest) => flatService.removeRenter(flatId, data),
    onSuccess: () => handleSuccess('remove', 'renter'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.removeRenterError || 'Failed to remove renter')
      console.error(error)
    }
  })

  const { mutate: addManager, isPending: isAddingManager } = useMutation({
    mutationKey: ['add flat manager', flatId],
    mutationFn: (data: IFlatUsersUpdateRequest) => flatService.addManager(flatId, data),
    onSuccess: () => handleSuccess('add', 'manager'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.addManagerError || 'Failed to add manager')
      console.error(error)
    }
  })

  const { mutate: removeManager, isPending: isRemovingManager } = useMutation({
    mutationKey: ['remove flat manager', flatId],
    mutationFn: (data: IFlatUsersUpdateRequest) => flatService.removeManager(flatId, data),
    onSuccess: () => handleSuccess('remove', 'manager'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.removeManagerError || 'Failed to remove manager')
      console.error(error)
    }
  })

  const { mutate: addOwner, isPending: isAddingOwner } = useMutation({
    mutationKey: ['add flat owner', flatId],
    mutationFn: (data: IFlatUsersUpdateRequest) => flatService.addOwner(flatId, data),
    onSuccess: () => handleSuccess('add', 'owner'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.addOwnerError || 'Failed to add owner')
      console.error(error)
    }
  })

  const { mutate: removeOwner, isPending: isRemovingOwner } = useMutation({
    mutationKey: ['remove flat owner', flatId],
    mutationFn: (data: IFlatUsersUpdateRequest) => flatService.removeOwner(flatId, data),
    onSuccess: () => handleSuccess('remove', 'owner'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.removeOwnerError || 'Failed to remove owner')
      console.error(error)
    }
  })
  const isLoading = 
    isAddingRenter || 
    isRemovingRenter || 
    isAddingManager || 
    isRemovingManager || 
    isAddingOwner || 
    isRemovingOwner;

  return {
    addRenter,
    removeRenter,
    addManager,
    removeManager,
    addOwner,
    removeOwner,
    isAddingRenter,
    isRemovingRenter,
    isAddingManager,
    isRemovingManager,
    isAddingOwner,
    isRemovingOwner,
    isLoading
  }
}