'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { EditIcon } from "./editIcon";
import { Link } from "@nextui-org/react";

export function DashboardTable({ columns, rows }: { columns?: Array<any>, rows?: Array<any> }) {

    if (!columns || !rows) {
        return null;
    }

    const renderCell = React.useCallback((subject: any, columnKey: any) => {
        const cellValue = subject[columnKey];

        switch (columnKey) {
            case "dashboardMarket:updatedAt":
                return (
                    <div className="text-[#999999]">
                        <span>{cellValue}</span>
                    </div>
                )
            case "dashboardMarket:actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Link href={`/admin/resources/categories/${subject.categoryKey}/${subject.key}`} className='cursor-pointer'>
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Link>
                    </div>
                );
            case "dashboardMarket:name":
                return (

                    <div className={cellValue === 0 ? "text-[#999999]" : 'text-black'}>
                        <Link href={`/resource/${subject.key}`} className='cursor-pointer text-black'>
                            <span>{cellValue}</span>
                        </Link>
                    </div>
                );
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
        </>
    );
}
