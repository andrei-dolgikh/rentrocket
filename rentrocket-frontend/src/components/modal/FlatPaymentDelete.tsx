import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

interface FlatPaymentDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFlatPayment?: {
    name: string;
  };
  handleDeleteFlatPayment: () => void;
}

export function FlatPaymentDelete({
  isOpen,
  onClose,
  selectedFlatPayment,
  handleDeleteFlatPayment
}: FlatPaymentDeleteProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Подтверждение удаления</ModalHeader>
        <ModalBody>
          <p>Вы уверены, что хотите удалить квитанцию "{selectedFlatPayment?.name}"?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose}>
            Отмена
          </Button>
          <Button color="danger" onPress={handleDeleteFlatPayment}>
            Удалить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}