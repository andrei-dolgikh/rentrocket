import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

type ConfirmationProps = {
  actionLabel?: string;
  actionHeader?: string;
  children: React.ReactNode;
  onActionClick: () => void;
  isOpen: boolean;
  onClose: () => void;
};

export function Confirmation({
  actionLabel = "Action",
  actionHeader = "Подтвердите действие",
  children,
  onActionClick,
  isOpen,
  onClose,
}: ConfirmationProps) {
  return (
    <Modal isOpen={isOpen} placement="center" backdrop="blur" className="max-w-md text-black">
      <ModalContent className="p-5">
        <ModalHeader className="flex flex-col gap-1">{actionHeader}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Отмена
          </Button>
          <Button color="primary" onPress={onActionClick}>
            {actionLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}