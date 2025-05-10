'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input } from "@heroui/react";
import { Confirmation } from '@/components/modal/Confirmation'
import { toast } from 'sonner'
import { useState } from "react";
import { TagChip } from '@/components/tag/TagChip'
import { Button } from "@heroui/react";
import { useFlatUsers } from "@/hooks/flats/useFlatUsers";
import { FlatUserRoles } from "@/types/user.types";
import { IFlatUsersUpdateRequest, IFlatUsersRemoveRequest } from '@/types/flat.types'
import { InviteUserModal } from "../modal/InviteUserModal";
import { UserBadge } from "../user/UserBadge";

export function FlatOwnersTable({
  columns,
  rows,
  flatId, 
}: {
  columns: Array<any>,
  rows: Array<any>,
  flatId: string,
}) {
  const [isDeleteUserConformationOpen, setIsDeleteUserConformationOpen] = useState(false);
  const [isAddUserConformationOpen, setIsAddUserConformationOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [selectedUserRole, setSelectedUserRole] = useState<FlatUserRoles>(FlatUserRoles.owner);
  const [isLoading, setIsLoading] = useState(false);
  const { addOwner, removeOwner } = useFlatUsers(flatId);

  const handleAddUser = async (email: string) => {
    if (!flatId) return;

    const data: IFlatUsersUpdateRequest = {
      email: email,
      role: selectedUserRole
    };

    setIsLoading(true);
    try {
      const response = addOwner(data);

      // toast.success(`Пользователь успешно добавлен как ${getRoleTranslation(selectedUserRole)}`);
      // You might want to refresh the data here
    } catch (error) {
      toast.error(`Ошибка при добавлении пользователя: ${error}`);
    } finally {
      setIsLoading(false);
      setIsAddUserConformationOpen(false);
    }
  };

  const handleRemoveUser = async () => {
    if (!selectedUserId || !flatId) return;

    const data: IFlatUsersRemoveRequest = {
      userId: selectedUserId,
      role: selectedUserRole
    };

    setIsLoading(true);
    try {
      let response = removeOwner(data);

      toast.success(`Пользователь успешно удален из роли ${getRoleTranslation(selectedUserRole)}`);
      // You might want to refresh the data here
    } catch (error) {
      toast.error(`Ошибка при удалении пользователя: ${error}`);
    } finally {
      setIsLoading(false);
      setIsDeleteUserConformationOpen(false);
    }
  };

  const getRoleTranslation = (role: FlatUserRoles): string => {
    switch (role) {
      case 'RENTER': return 'Арендатор';
      case 'MANAGER': return 'Менеджер';
      case 'OWNER': return 'Владелец';
      default: return role;
    }
  };


  const renderCell = React.useCallback((subject: any, columnKey: any) => {
    const cellValue = subject[columnKey];

    switch (columnKey) {
      case "user":
        return (
          <UserBadge subject={subject} />
        )
      case "users:roles":
        return (
          <div className="flex gap-3 items-center">
            {cellValue.map((role: any) => (
              <TagChip key={role} name={role} size={"sm"} />
            ))}
          </div>
        );
      case "users:actions":
        return (
          <div className="relative flex items-center gap-2">
            {/* <UserTableActionsDropnown
              setSelectedUserId={setSelectedUserId}
              setSelectedUserRole={setSelectedUserRole}
              setIsAddUserConformationOpen={setIsAddUserConformationOpen}
              setIsDeleteUserConformationOpen={setIsDeleteUserConformationOpen}
              subject={subject}
            /> */}
            <Button
              key="remove-owner"
              color="danger"
              onPress={() => {
                setSelectedUserId(subject.id);
                setSelectedUserRole(FlatUserRoles.owner);
                setIsDeleteUserConformationOpen(true);
              }}
            >
              Удалить
            </Button>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className='flex justify-between items-center mb-[10px]'>
        <div className='flex items-center justify-between gap-5'>
          <Button
            color="primary"
            onPress={() => {
              setSelectedUserRole(FlatUserRoles.owner);
              setIsAddUserConformationOpen(true);
            }}
          >
            Добавить владельца
          </Button>
        </div>
      </div>

      <Table aria-label="Table">
        <TableHeader columns={columns} >
          {(column) => (
            <TableColumn key={column.key} align={column.key === "actions" ? "center" : "start"}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* invitations table */}


      <InviteUserModal
        isOpen={isAddUserConformationOpen}
        onClose={() => setIsAddUserConformationOpen(false)}
        onInviteUser={handleAddUser}
        isLoading={isLoading}
      />

      <Confirmation
        isOpen={isDeleteUserConformationOpen}
        onClose={() => setIsDeleteUserConformationOpen(false)}
        onActionClick={handleRemoveUser}
        actionLabel={`Удалить арендатора`}
        actionHeader={`Подтвердите удаление арендатора`}
        isLoading={isLoading}
      >
        <p className="my-4">Вы уверены, что хотите удалить этого арендатора?</p>
      </Confirmation>
    </>
  );
}