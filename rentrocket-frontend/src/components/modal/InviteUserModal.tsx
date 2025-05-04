import React, { useState } from "react";
import { Input } from "@heroui/react";
import { Confirmation } from "./Confirmation";

type InviteUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onInviteUser: (email: string) => Promise<void>;
  isLoading: boolean;
};

export function InviteUserModal({
  isOpen,
  onClose,
  onInviteUser,
  isLoading,
}: InviteUserModalProps) {
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInviteUser = async () => {
    if (inviteEmail) {
      await onInviteUser(inviteEmail);
      setInviteEmail("");
    }
  };

  return (
    <Confirmation
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setInviteEmail("");
      }}
      onActionClick={handleInviteUser}
      actionHeader="Приглашение"
      actionLabel="Добавить арендатора"
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
  );
}