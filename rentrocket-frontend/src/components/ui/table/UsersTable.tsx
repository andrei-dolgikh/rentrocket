'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { EditIcon } from "./editIcon";
import { DeleteIcon } from "./deleteIcon";
import { Link } from "@nextui-org/react";
import { Confirmation } from '@/components/ui/modal/Confirmation'
import { useDeleteUser } from "@/app/[lang]/admin/users/hooks/useDeleteUser";
import { useState } from "react";
import { TagChip } from '@/components/ui/tag/TagChip'


export function UsersTable({ columns, rows }: { columns: Array<any>, rows: Array<any> }) {
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
      case "users:roles":
        return (
          <div className="flex gap-3 items-center">
            {cellValue.map((role: any) => (
              <TagChip key={role.id} name={role} size={"sm"} />
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

      case "tags:actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link href={`/admin/tags/${subject.id}`} className='cursor-pointer'>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Link>
            <Link color="danger">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Link>
          </div>
        );

      case "rules:actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link href={`/admin/spamfilter/${subject.id}`} className='cursor-pointer'>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Link>
            <Link color="danger">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Link>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <>
    <Table aria-label="Table" className="text-black">
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
          <p>Вы уверены, что хотите удалить учетную запись пользователя?</p>
        </Confirmation>
      )}
      </>
  );
}
