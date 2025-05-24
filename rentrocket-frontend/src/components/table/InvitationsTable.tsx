'use client'
import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { IFlatInvitation, FlatInvitationStatus, FlatInvitationRole } from "@/types/flat.types";
import ReceivedInvitationsDropdown from "../flat/ReceivedInvitationsDropnown";
import { toast } from "sonner";
import { Confirmation } from '@/components/modal/Confirmation';
import { User, Link } from "@heroui/react";
import { useInvitations } from "@/hooks/useInvitations";
import { UserBadge } from "../user/UserBadge";

export function InvitationsTable({ invitations, actions, filter }: { invitations: IFlatInvitation[], actions?: boolean, filter?: any }) {
  if (filter) {
    invitations = invitations.filter(invitation => invitation.role === filter)
  }
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<{ type: 'accept' | 'reject', userId: string } | null>(null);
  const { acceptInvitation, rejectInvitation, isLoading } = useInvitations();

  const columns = [
    {
      key: "user",
      label: "Получатель",
    },
    {
      key: "invitedBy",
      label: "Отправитель",
    },
    {
      key: "eventType",
      label: "Тип действия",
    },
    {
      key: "status",
      label: "Статус",
    },
    {
      key: actions ? "actions" : "-",
      label: "",
    },
  ];

  const handleAction = async () => {
    if (!currentAction) return;

    if (currentAction.type === 'accept') {
      const response = acceptInvitation(currentAction.userId);
    } else {
      const response = rejectInvitation(currentAction.userId);
    }

  };



  const renderCell = React.useCallback((subject: any, columnKey: any) => {
    const cellValue = subject[columnKey];
    console.log('subject', subject)
    switch (columnKey) {
      case "actions":
        return subject.status === FlatInvitationStatus.PENDING ? (
          <div className="relative flex items-center gap-2">
            <ReceivedInvitationsDropdown
              onActionSelected={(action) => {
                setCurrentAction(action);
                setIsConfirmationOpen(true);
              }}
              subject={subject}
            />
          </div>
        ) : null;
      case "user":
        return (
          <div>
            {cellValue ? (
              <UserBadge subject={cellValue} />
            ) : (
              <span>{subject.email}</span>
            )}
          </div>
        );
      case "invitedBy":
        return (
              <UserBadge subject={cellValue} />
        )
      case "eventType":
        return (
          <div>
            {subject.role === FlatInvitationRole.OWNER && 'Новый владелец'}
            {subject.role === FlatInvitationRole.RENTER && 'Новый арендатор'}
            {subject.role === FlatInvitationRole.MANAGER && 'Новый менеджер'}
          </div>
        );
      case "status":
        return (
          <div className={
            subject.status === FlatInvitationStatus.ACCEPTED ? 'text-green-500' :
              subject.status === FlatInvitationStatus.DECLINED ? 'text-red-500' :
                'text-yellow-500'
          }>
            <span>{subject.status}</span>
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
        <TableBody items={invitations}>
          {(invitation) => (
            <TableRow key={invitation.id}>
              {(columnKey) => <TableCell>{renderCell(invitation, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Confirmation
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onActionClick={handleAction}
        isLoading={isLoading}
        actionHeader={currentAction?.type === 'accept' ? "Подтверждение приглашения" : "Отклонение приглашения"}
        actionLabel={currentAction?.type === 'accept' ? "Подтвердить" : "Отклонить"}
        actionButtonColor={currentAction?.type === 'accept' ? "success" : "danger"}
      >
        <p>
          {currentAction?.type === 'accept'
            ? "Вы уверены, что хотите подтвердить это приглашение?"
            : "Вы уверены, что хотите отклонить это приглашение?"}
        </p>
      </Confirmation>
    </>
  );
}