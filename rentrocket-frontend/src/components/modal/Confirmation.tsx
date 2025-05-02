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
  // Добавляем возможность передать дополнительные действия в футер
  additionalActions?: React.ReactNode;
  // Добавляем возможность изменить стиль основной кнопки действия
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
  // Обработчик клика по кнопке действия
  const handleActionClick = () => {
    // Вызываем переданную функцию
    onActionClick();
    // Если не в состоянии загрузки, сразу закрываем модальное окно
    if (!isLoading) {
      onClose();
    }
  };

  // Обработчик закрытия модального окна
  const handleClose = () => {
    // Только если не в состоянии загрузки
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      placement="center" 
      backdrop="blur" 
      className="max-w-md text-black"
      onClose={handleClose} // Добавляем обработчик закрытия
      isDismissable={!isLoading} // Запрещаем закрытие при клике вне модалки во время загрузки
    >
      {isLoading ? (
        <ModalContent className="p-5 flex justify-center items-center min-h-[200px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <p>Пожалуйста, подождите...</p>
          </div>
        </ModalContent>
      ) : (
        <ModalContent className="p-5">
          <ModalHeader className="flex flex-col gap-1">{actionHeader}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter className="flex justify-between">
            <div className="flex gap-2">
              {additionalActions}
            </div>
            <div className="flex gap-2">
              <Button 
                color="danger" 
                variant="light" 
                onPress={handleClose}
                autoFocus={actionButtonColor === "danger"} // Фокус на кнопке отмены для опасных действий
              >
                Отмена
              </Button>
              <Button 
                color={actionButtonColor} 
                onPress={handleActionClick}
                autoFocus={actionButtonColor !== "danger"} // Фокус на кнопке действия для безопасных действий
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