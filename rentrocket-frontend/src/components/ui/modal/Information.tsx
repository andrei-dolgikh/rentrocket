import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

type InformationProps = {
  actionHeader?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function Information({
  actionHeader = "Информация",
  children,
  isOpen,
  onClose,
}: InformationProps) {
  return (
    <Modal isOpen={isOpen} placement="center" backdrop="blur" className="max-w-md">
      <ModalContent className="p-5">
        <ModalHeader className="flex flex-col gap-1">{actionHeader}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button color="success" variant="light" onPress={onClose}>
            Понятно
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}