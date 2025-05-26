import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { FlatPaymentDocumentsUploader } from "../flat/FlatPaymentDocumentsUploader";

interface FlatPaymentFormProps {
  isOpen: boolean;
  onClose: () => void;
  flatPaymentForm: {
    id?: string;
    name: string;
    amount: number;
    period: Date;
    description?: string;
    files: string[];
  };
  setFlatPaymentForm: (form: any) => void;
  handleSaveFlatPayment: () => void;
}

export function FlatPaymentEdit({ isOpen, onClose, flatPaymentForm, setFlatPaymentForm, handleSaveFlatPayment }: FlatPaymentFormProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="text-black">
      <ModalContent>
        <ModalHeader>{flatPaymentForm.id ? 'Редактировать квитанцию' : 'Добавить квитанцию'}</ModalHeader>
        <ModalBody>
          <Input
            label="Название"
            value={flatPaymentForm.name}
            onChange={(e) => setFlatPaymentForm({ ...flatPaymentForm, name: e.target.value })}
            className="mb-4"
          />
          <Input
            type="number"
            label="Сумма"
            value={flatPaymentForm.amount.toString()}
            onChange={(e) => setFlatPaymentForm({ ...flatPaymentForm, amount: parseFloat(e.target.value) })}
            className="mb-4"
          />
          <Input
            type="month"
            label="Месяц"
            value={new Date(flatPaymentForm.period).toISOString().split('-').slice(0, 2).join('-')}
            onChange={(e) => setFlatPaymentForm({ ...flatPaymentForm, period: new Date(e.target.value) })}
            className="mb-4"
          />
          <Input
            label="Описание (необязательно)"
            value={flatPaymentForm.description}
            onChange={(e) => setFlatPaymentForm({ ...flatPaymentForm, description: e.target.value })}
            className="mb-4"
          />
          <FlatPaymentDocumentsUploader
            files={flatPaymentForm.files}
            setFiles={(files) => setFlatPaymentForm({ ...flatPaymentForm, files })}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={onClose}>
            Отмена
          </Button>
          <Button color="primary" onPress={handleSaveFlatPayment}>
            Сохранить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}