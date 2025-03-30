'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { EditIcon } from "./editIcon";
import { DeleteIcon } from "./deleteIcon";
import { Confirmation } from '@/components/ui/modal/Confirmation'
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useState } from "react";
import { TagChip } from '@/components/ui/tag/TagChip'
import {User, Link} from "@heroui/react";


export function FlatUsersTable({ columns, rows }: { columns: Array<any>, rows: Array<any> }) {
  const { deleteUser } = useDeleteUser();
  const [isDeleteUserConformationOpen, setIsDeleteUserConformationOpen] = useState(false);  
  const [selectedUserId, setSelectedUserId] = useState(undefined);


  const handleDeleteLink = (userId?: string) => {
    if (!userId) return;
    deleteUser(userId);
    setIsDeleteUserConformationOpen(false);
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
            <Link href={`/admin/users/${subject.id}`} className='cursor-pointer'>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Link>

            <div
              color="danger"
              content="Удалить пользователя"
              onClick={() => {
                setSelectedUserId(subject.id);
                setIsDeleteUserConformationOpen(true);
              }}>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </div>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <>
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
          actionLabel="Удалить пользователя"
          actionHeader="Подтвердите удаление пользователя"
          onActionClick={() => handleDeleteLink(selectedUserId)}
          onClose={() => {
            setIsDeleteUserConformationOpen(false);
          }}
        >
          <p>Подтвердите удаление пользователя из квартиры.</p>
        </Confirmation>
      )}
      </>
  );
}
