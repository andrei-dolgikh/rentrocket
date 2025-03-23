'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { EditIcon } from "./editIcon";
import { DeleteIcon } from "./deleteIcon";
import { Link } from "@heroui/react";
import { Chip } from "@heroui/chip";
import { Confirmation } from '@/components/ui/modal/Confirmation'
import { useDeleteRule } from "@/app/admin/spamfilter/hooks/useDeleteRule";
import { useState } from "react";


export function SpamfilterTable({ columns, rows }: { columns: Array<any>, rows: Array<any> }) {
  const { deleteRule } = useDeleteRule();
  const [isDeleteRuleConformationOpen, setIsDeleteRuleConformationOpen] = useState(false);  
  const [selectedRuleId, setSelectedRuleId] = useState(undefined);


  const handleDeleteLink = (ruleId?: string) => {
    if (!ruleId) return;
    deleteRule(ruleId);
    setIsDeleteRuleConformationOpen(false);
  };

  const renderCell = React.useCallback((subject: any, columnKey: any) => {
    const cellValue = subject[columnKey];

    switch (columnKey) {
      case "rules:actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link href={`/admin/spamfilter/${subject.id}`} className='cursor-pointer'>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Link>
            <div
              color="danger"
              content="Удалить правило"
              onClick={() => {
                setSelectedRuleId(subject.id);
                setIsDeleteRuleConformationOpen(true);
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
      {isDeleteRuleConformationOpen && (
        <Confirmation
          isOpen={isDeleteRuleConformationOpen}
          actionLabel="Удалить правило"
          actionHeader="Подтвердите удаление правила"
          onActionClick={() => handleDeleteLink(selectedRuleId)}
          onClose={() => {
            setIsDeleteRuleConformationOpen(false);
          }}
        >
          <p>Вы уверены, что хотите удалить правило?</p>
        </Confirmation>
      )}
      </>
  );
}
