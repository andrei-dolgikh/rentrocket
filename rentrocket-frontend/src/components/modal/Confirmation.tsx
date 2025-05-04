import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

type ConfirmationProps = {
  actionLabel?: string;
  actionHeader?: string;
  children: React.ReactNode;
  onActionClick: () => void;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  additionalActions?: React.ReactNode;
  actionButtonColor?: "primary" | "success" | "danger" | "warning";
};

export function Confirmation({
  actionLabel = "Action",
  actionHeader = "Подтвердите действие",
  children,
  onActionClick,
  isOpen,
  onClose,
  isLoading,
  additionalActions,
  actionButtonColor = "primary"
}: ConfirmationProps) {
  const handleActionClick = () => {
    onActionClick();
    if (!isLoading) {
      onClose();
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      placement="center" 
      backdrop="blur" 
      className="mx-4 max-w-md text-black"
      // onClose={handleClose}
      isDismissable={!isLoading}
      hideCloseButton={true}
    >
      {isLoading ? (
        <ModalContent className="p-4 flex justify-center items-center min-h-[200px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <p>Пожалуйста, подождите...</p>
          </div>
        </ModalContent>
      ) : (
        <ModalContent className="p-4">
          <ModalHeader className="flex flex-col gap-1 text-center sm:text-left">{actionHeader}</ModalHeader>
          <ModalBody className="py-1">{children}</ModalBody>
          <ModalFooter className="flex flex-col-reverse sm:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start w-full sm:w-auto">
              {additionalActions}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                color="danger" 
                variant="light" 
                onPress={handleClose}
                autoFocus={actionButtonColor === "danger"}
                className="flex-1 sm:flex-none"
              >
                Отмена
              </Button>
              <Button 
                color={actionButtonColor} 
                onPress={handleActionClick}
                autoFocus={actionButtonColor !== "danger"}
                className="flex-1 sm:flex-none"
              >
                {actionLabel}
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
}