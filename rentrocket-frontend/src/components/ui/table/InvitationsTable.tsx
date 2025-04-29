'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { EditIcon } from "./editIcon";
import { Link } from "@heroui/react";
import { IFlatInvitation } from "@/types/flat.types";

export function InvitationsTable({ invitations}: { invitations : IFlatInvitation[]}) {

    // { columns, rows }: { columns?: Array<any>, rows?: Array<any> }
    // if (!columns || !rows) {
    //     return null;
    // }

    const columns = [
      {
        key: "email",
        label: "Получатель",
      },
      {
        key: "sender",
        label: "Отправитель",
      },
      {
        key: "status",
        label: "Статус",
      },
    ];

    const renderCell = React.useCallback((subject: any, columnKey: any) => {
        const cellValue = subject[columnKey];

        switch (columnKey) {
            default:
                return (
                    <div className={cellValue === 0 ? "text-[#999999]" : 'text-black'}>
                        <span>{cellValue}</span>
                    </div>
                );
        }
    }, []);

    return (
        <>
        <div className='flex justify-between items-center mb-[10px]'>
          <div className='flex items-center justify-between gap-5'>
            История приглашений
          </div>
        </div>
            <Table aria-label="Table" className="text-black">
                <TableHeader columns={columns} >
                    {(column) => (
                        <TableColumn key={column.key} align={column.key === "actions" ? "center" : "start"}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={invitations}>
                    {(invitation) => (
                        <TableRow key={invitation.id}>
                            {(columnKey) => <TableCell>{renderCell(invitation, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
