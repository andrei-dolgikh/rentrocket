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

  const { mutate: addUser, isPending: isAddingUser } = useMutation({
    mutationKey: ['add flat renter', flatId],
    mutationFn: (data: IFlatUsersUpdateRequest) => invitationService.addUser(flatId, data),
    onSuccess: () => handleSuccess('add', 'renter'),
    onError: (error) => {
      toast.error(dictionary?.hooks?.addUserError || 'Failed to add renter')
      console.error(error)
    }
  })

  const { mutate: removeUser, isPending: isRemovingUser } = useMutation({
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
    isAddingUser || 
    isRemovingUser;

  return {
    addUser,
    removeUser,
    isLoading,
    acceptInvitation,
    rejectInvitation,
    isAcceptingInvitation,
    isRejectingInvitation
  }
}