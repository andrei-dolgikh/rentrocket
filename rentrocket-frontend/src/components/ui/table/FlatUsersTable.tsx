'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { Confirmation } from '@/components/ui/modal/Confirmation'
import { toast } from 'sonner'
import { useState } from "react";
import { TagChip } from '@/components/ui/tag/TagChip'
import { User, Link, Button } from "@heroui/react";
import { useFlatUserManagement } from "@/app/[lang]/myspace/flats/hooks/useFlatUserManagement";
import UserTableActionsDropnown from "./UserTableActionsDropnown";
import { FlatUserRoles } from "@/types/user.types";
import { IFlatUsersUpdateRequest} from '@/types/flat.types'

export function FlatUsersTable({
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
  const { addRenter, removeRenter, addManager, removeManager, addOwner, removeOwner } = useFlatUserManagement(flatId);

  const handleAddUser = async (data?: IFlatUsersUpdateRequest, role?: FlatUserRoles) => {
    if (!data || !role || !flatId) return;

    setIsLoading(true);
    try {
      let response;

      switch (role) {
        case 'renter':
          response = addRenter(data);
          break;
        case 'manager':
          response = addManager(data);
          break;
        case 'owner':
          response = addOwner(data);
          break;
      }

      toast.success(`Пользователь успешно добавлен как ${getRoleTranslation(role)}`);
      // You might want to refresh the data here
    } catch (error) {
      toast.error(`Ошибка при добавлении пользователя: ${error}`);
    } finally {
      setIsLoading(false);
      setIsAddUserConformationOpen(false);
    }
  };

  const handleRemoveUser = async (data?: IFlatUsersUpdateRequest, role?: FlatUserRoles) => {
    if (!data || !role || !flatId) return;

    setIsLoading(true);
    try {
      let response;

      switch (role) {
        case 'renter':
          response = removeRenter(data);
          break;
        case 'manager':
          response = removeManager(data);
          break;
        case 'owner':
          response = removeOwner(data);
          break;
      }

      toast.success(`Пользователь успешно удален из роли ${getRoleTranslation(role)}`);
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
      case 'renter': return 'Арендатор';
      case 'manager': return 'Менеджер';
      case 'owner': return 'Владелец';
      default: return role;
    }
  };


  const renderCell = React.useCallback((subject: any, columnKey: any) => {
    const cellValue = subject[columnKey];

    switch (columnKey) {
      case "user":
        return (
          <User key={subject.id}
            avatarProps={{
              src: "https://avatars.githubusercontent.com/u/30373425?v=4",
            }}
            description={
              <Link isExternal href="https://x.com/jrgarciadev" size="sm">
                @{cellValue.login}
              </Link>
            }
            name={cellValue.name}
          />
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
        <div className='flex items-center gap-5'>
          <Button
            color="primary"
            onPress={() => setIsAddUserConformationOpen(true)}
          >
            Добавить арендатора
          </Button>
          <Button
            color="primary"
            onPress={() => setIsAddUserConformationOpen(true)}
          >
            Добавить собственника
          </Button>
          <Button
            color="primary"
            onPress={() => setIsAddUserConformationOpen(true)}
          >
            Добавить менеджера
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

      {isDeleteUserConformationOpen && (
        <Confirmation
          isOpen={isDeleteUserConformationOpen}
          actionLabel={`Удалить из роли ${getRoleTranslation(selectedUserRole)}`}
          actionHeader={`Подтвердите удаление из роли ${getRoleTranslation(selectedUserRole)}`}
          onActionClick={() => handleRemoveUser({userId: selectedUserId}, selectedUserRole)}
          onClose={() => {
            setIsDeleteUserConformationOpen(false);
          }}
          isLoading={isLoading}
        >
          <p>Вы уверены, что хотите удалить пользователя из роли {getRoleTranslation(selectedUserRole)}?</p>
        </Confirmation>
      )}

      {/* Modal for adding user to a role */}
      {isAddUserConformationOpen && (
        <Confirmation
          isOpen={isAddUserConformationOpen}
          actionLabel={`Добавить как ${getRoleTranslation(selectedUserRole)}`}
          actionHeader={`Подтвердите добавление в роль ${getRoleTranslation(selectedUserRole)}`}
          onActionClick={() => handleAddUser({userId: selectedUserId}, selectedUserRole)}
          onClose={() => {
            setIsAddUserConformationOpen(false);
          }}
          isLoading={isLoading}
        >
          <p>Вы уверены, что хотите добавить пользователя в роль {getRoleTranslation(selectedUserRole)}?</p>
        </Confirmation>
      )}
    </>
  );
}
