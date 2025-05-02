'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input } from "@heroui/react";
import { Confirmation } from '@/components/modal/Confirmation'
import { toast } from 'sonner'
import { useState } from "react";
import { TagChip } from '@/components/tag/TagChip'
import { User, Link, Button } from "@heroui/react";
import { useFlatUsers } from "@/app/[lang]/myspace/flats/hooks/useFlatUsers";
import UserTableActionsDropnown from "./UserTableActionsDropnown";
import { FlatUserRoles } from "@/types/user.types";
import { IFlatUsersUpdateRequest } from '@/types/flat.types'

export function FlatRentersTable({
  columns,
  rows,
  flatId
}: {
  columns: Array<any>,
  rows: Array<any>,
  flatId: string
}) {
  const [isDeleteUserConformationOpen, setIsDeleteUserConformationOpen] = useState(false);
  const [isAddUserConformationOpen, setIsAddUserConformationOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [selectedUserRole, setSelectedUserRole] = useState<FlatUserRoles>(FlatUserRoles.renter);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const { addUser, removeUser } = useFlatUsers(flatId);

  const handleAddUser = async () => {
    if (!flatId) return;

    const data: IFlatUsersUpdateRequest = {
      email: inviteEmail,
      role: selectedUserRole
    };

    setIsLoading(true);
    try {
      const response = addUser(data);

      toast.success(`Пользователь успешно добавлен как ${getRoleTranslation(selectedUserRole)}`);
      // You might want to refresh the data here
    } catch (error) {
      toast.error(`Ошибка при добавлении пользователя: ${error}`);
    } finally {
      setIsLoading(false);
      setIsAddUserConformationOpen(false);
      setInviteEmail('');
    }
  };

  const handleRemoveUser = async () => {
    if (!selectedUserId || !flatId) return;

    const data: IFlatUsersUpdateRequest = {
      email: selectedUserId,
      role: selectedUserRole
    };

    setIsLoading(true);
    try {
      let response = removeUser(data);

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
          <div>
            {subject.login ? (
              <User key={subject.id}
                avatarProps={{
                  src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                }}
                description={
                  <Link isExternal href="https://x.com/jrgarciadev" size="sm">
                    @{subject.login}
                  </Link>
                }
                name={subject.name}
              />
            ) : (
              <span className="text-[#999999]">Пользователь не найден</span>
            )}
          </div>
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
            <UserTableActionsDropnown
              setSelectedUserId={setSelectedUserId}
              setSelectedUserRole={setSelectedUserRole}
              setIsAddUserConformationOpen={setIsAddUserConformationOpen}
              setIsDeleteUserConformationOpen={setIsDeleteUserConformationOpen}
              subject={subject}
            />
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
              setSelectedUserRole(FlatUserRoles.renter);
              setIsAddUserConformationOpen(true);
            }}
          >
            Добавить арендатора
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


      <Confirmation
        isOpen={isAddUserConformationOpen}
        onClose={() => setIsAddUserConformationOpen(false)}
        onActionClick={handleAddUser}
        actionLabel={`Добавить пользователя в квартиру`}
        actionHeader={`Добавить пользователя в квартиру как ${getRoleTranslation(selectedUserRole)}`}
        isLoading={isLoading}
      >
        <div className="my-4">
          <p className="mb-2">Введите email пользователя для отправки приглашения:</p>
          <Input
            type="email"
            placeholder="Email пользователя"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="w-full"
          />
        </div>
      </Confirmation>

      <Confirmation
        isOpen={isDeleteUserConformationOpen}
        onClose={() => setIsDeleteUserConformationOpen(false)}
        onActionClick={handleRemoveUser}
        actionLabel={`Удалить пользователя из квартиры`}
        actionHeader={`Подтвердите удаление пользователя в квартру как ${getRoleTranslation(selectedUserRole)}`}
        isLoading={isLoading}
      >
        <p className="my-4">Вы уверены, что хотите удалить этого пользователя из роли {getRoleTranslation(selectedUserRole)}?</p>
      </Confirmation>
    </>
  );
}