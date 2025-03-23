'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { EditIcon } from "./editIcon";
import { DeleteIcon } from "./deleteIcon";
import { Link } from "@heroui/react";
import { Confirmation } from '@/components/ui/modal/Confirmation'
import { useDeleteTag } from "../../../app/[lang]/admin/tags/hooks/useDeleteTag";
import { useState } from "react";
import { useLanguage } from '../../../app/[lang]/languageContext';
import { createLocalizedUrl } from '../../../utils/utils'


export function TagsTable({ columns, rows }: { columns: Array<any>, rows: Array<any> }) {
  const { deleteTag } = useDeleteTag();
  const [isDeletetagConformationOpen, setIsDeletetagConformationOpen] = useState(false);  
  const [selectedTagId, setSelectedTagId] = useState(undefined);
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();


  const handleDeleteLink = (tagId?: string) => {
    if (!tagId) return;
    deleteTag(tagId);
    setIsDeletetagConformationOpen(false);
  };

  const renderCell = React.useCallback((subject: any, columnKey: any) => {
    const cellValue = subject[columnKey];

    switch (columnKey) {
      case "tags:actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link href={createLocalizedUrl(lang, `/myspace/tags/${subject.id}`)} className='cursor-pointer'>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Link>

            <div
              color="danger"
              content="Удалить тег"
              onClick={() => {
                setSelectedTagId(subject.id);
                setIsDeletetagConformationOpen(true);
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
      {isDeletetagConformationOpen && (
        <Confirmation
          isOpen={isDeletetagConformationOpen}
          actionLabel="Удалить тега"
          actionHeader="Подтвердите удаление тега"
          onActionClick={() => handleDeleteLink(selectedTagId)}
          onClose={() => {
            setIsDeletetagConformationOpen(false);
          }}
        >
          <p>Вы уверены, что хотите удалить тег?</p>
        </Confirmation>
      )}
      </>
  );
}
