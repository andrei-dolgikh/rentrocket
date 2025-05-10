import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useLanguage } from '../../app/[lang]/languageContext'
import { invitationService } from '@/services/invitation.service'
import { IFlatUsersUpdateRequest} from '@/types/flat.types'

type UserRole = 'renter' | 'manager' | 'owner';
type UserOperation = 'add' | 'remove' | 'update';

export function useFlatUsers(flatId: string) {
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
    mutationFn: (data: IFlatUsersUpdateRequest) => invitationService.addUser(flatId, data),
    onSuccess: () => handleSuccess('add', 'renter'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.addUserError || 'Failed to add renter')
      console.error(error)
    }
  })

  const { mutate: addManager, isPending: isAddingManager } = useMutation({
    mutationKey: ['add flat manager', flatId],
    mutationFn: (data: IFlatUsersUpdateRequest) => invitationService.addUser(flatId, data),
    onSuccess: () => handleSuccess('add', 'manager'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.addUserError || 'Failed to add manager')
      console.error(error)
    }
  })

  const { mutate: addOwner, isPending: isAddingOwner } = useMutation({
    mutationKey: ['add flat owner', flatId],
    mutationFn: (data: IFlatUsersUpdateRequest) => invitationService.addUser(flatId, data),
		onSuccess() {
			handleSuccess('add', 'owner')
			// queryClient.invalidateQueries({ queryKey: ['users'] })
		},
    onError: (error) => {
      toast.error(dictionary?.hooks?.addUserError || 'Failed to add owner')
      console.error(error)
    }
  })

  const { mutate: removeRenter, isPending: isRemovingRenter } = useMutation({
    mutationKey: ['remove flat renter', flatId],
    mutationFn: (data: IFlatUsersUpdateRequest) => invitationService.removeUser(flatId, data),
    onSuccess: () => handleSuccess('remove', 'renter'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.removeUserError || 'Failed to remove user')
      console.error(error)
    }
  })

  const { mutate: removeManager, isPending: isRemovingManager } = useMutation({
    mutationKey: ['remove flat renter', flatId],
    mutationFn: (data: IFlatUsersUpdateRequest) => invitationService.removeUser(flatId, data),
    onSuccess: () => handleSuccess('remove', 'renter'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.removeUserError || 'Failed to remove user')
      console.error(error)
    }
  })

  const { mutate: removeOwner, isPending: isRemovingOwner } = useMutation({
    mutationKey: ['remove flat renter', flatId],
    mutationFn: (data: IFlatUsersUpdateRequest) => invitationService.removeUser(flatId, data),
    onSuccess: () => handleSuccess('remove', 'renter'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.removeUserError || 'Failed to remove user')
      console.error(error)
    }
  })

  const { mutate: acceptInvitation, isPending: isAcceptingInvitation } = useMutation({
    mutationKey: ['accept invitation', flatId],
    mutationFn: (invitationId: string) => invitationService.acceptInvitation(invitationId),
    onSuccess: () => handleSuccess('update', 'renter'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.acceptInvitationError || 'Failed to accept invitation')
      console.error(error)
    }
  })

  const { mutate: rejectInvitation, isPending: isRejectingInvitation } = useMutation({
    mutationKey: ['reject invitation', flatId],
    mutationFn: (invitationId: string) => invitationService.rejectInvitation(invitationId),
    onSuccess: () => handleSuccess('update', 'renter'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.rejectInvitationError || 'Failed to reject invitation')
      console.error(error)
    }
  })

  const isLoading = 
    isAddingRenter || 
    isAddingOwner || 
    isAddingManager || 
    isRemovingRenter || 
    isRemovingOwner || 
    isRemovingManager;

  return {
    addRenter,
    addManager,
    addOwner,
    removeManager,
    removeRenter,
    removeOwner,
    isLoading,
    acceptInvitation,
    rejectInvitation,
    isAcceptingInvitation,
    isRejectingInvitation
  }
}