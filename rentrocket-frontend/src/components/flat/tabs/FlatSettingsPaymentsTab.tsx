'use client'
import { useState, useRef } from "react";
import { Button, Card, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Input } from "@heroui/input";
import { PlusCircle, MoreVertical, Edit, Trash2 } from "lucide-react";
import { IFlatResponse } from '@/types/flat.types'
import { Divider } from "@heroui/react";
import { useCreateFlatPayment } from "@/hooks/flatPayments/useCreateFlatPayment";
import { useUpdateFlatPayment } from "@/hooks/flatPayments/useUpdateFlatPayment";
import { useDeleteFlatPayment } from "@/hooks/flatPayments/useDeleteFlatPayment";
import { FlatPaymentDocumentsUploader } from "../FlatPaymentDocumentsUploader";
import { FlatPaymentDelete } from "@/components/modal/FlatPaymentDelete";
import { FlatPaymentEdit } from "@/components/modal/FlatPaymentEdit";

interface IFlatPayment {
  id?: string;
  name: string;
  amount: number;
  period: Date;
  description?: string;
  files: string[];
}

export function FlatSettingsPaymentsTab({ flat }: { flat?: IFlatResponse }) {
  if (!flat) return <div>Квартира не найдена</div>

  const { createFlatPayment, isPending: isCreating } = useCreateFlatPayment();
  const { updateFlatPayment, isUpdatePending } = useUpdateFlatPayment();
  const { deleteFlatPayment, isDeletePending } = useDeleteFlatPayment();


  const [flatPayments, setFlatPayments] = useState<IFlatPayment[]>([
    { id: '1', name: 'Электричество', amount: 2500, period: new Date(), files: ['file1.pdf', 'file2.pdf'] },
    { id: '2', name: 'Вода', amount: 1200, period: new Date(), files: []},
  ]);
  
  const [selectedFlatPayment, setSelectedFlatPayment] = useState<IFlatPayment | null>(null);
  const [flatPaymentForm, setFlatPaymentForm] = useState<IFlatPayment>({
    name: "",
    description: "",
    amount: 0,
    period: new Date(),
    files: [],
  });  

  const { isOpen: isFlatPaymentModalOpen, onOpen: onFlatPaymentModalOpen, onClose: onFlatPaymentModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  const handleAddFlatPayment = () => {
    setFlatPaymentForm({
      name: "",
      description: "",
      amount: 0,
      period: new Date(),
      files: [],
    });
    onFlatPaymentModalOpen();
  };

  const handleEditFlatPayment = (flatPayment: IFlatPayment) => {
    setFlatPaymentForm(flatPayment);
    onFlatPaymentModalOpen();
  };

  const handleDeleteClick = (flatPayment: IFlatPayment) => {
    setSelectedFlatPayment(flatPayment);
    onDeleteModalOpen();
  };

  const handleSaveFlatPayment = () => {
    const formData = new FormData();
    if (flatPaymentForm.id) {
      // updateFlatPayment({ id: flatPaymentForm.id, data: flatPaymentForm });
      
      // Mock update for demonstration
      setFlatPayments(prevFlatPayments => 
        prevFlatPayments.map(flatPayment => flatPayment.id === flatPaymentForm.id ? flatPaymentForm : flatPayment)
      );
    } else {
      // createFlatPayment({ id: flat.id, data: flatPaymentForm });
      
      // Mock create for demonstration
      const newFlatPayment = { ...flatPaymentForm, id: Date.now().toString() };
      setFlatPayments(prevFlatPayments => [...prevFlatPayments, newFlatPayment]);
    }

    onFlatPaymentModalClose();
  };

  const handleDeleteFlatPayment = () => {
    if (!selectedFlatPayment?.id) return;

    // deleteFlatPayment(selectedFlatPayment.id);
    
    // Mock delete for demonstration
    setFlatPayments(prevFlatPayments => prevFlatPayments.filter(flatPayment => flatPayment.id !== selectedFlatPayment.id));
    onDeleteModalClose();
    setSelectedFlatPayment(null);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className='flex flex-col'>
      <Card>
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Квитанции об оплате ЖКХ услуг</h2>
          <Button color="primary" startContent={<PlusCircle size={20} />} onPress={handleAddFlatPayment}>
            Добавить квитанцию
          </Button>
        </div>
        <Divider />
        
        <Table aria-label="Utility FlatPayments Table">
          <TableHeader>
            <TableColumn>Название</TableColumn>
            <TableColumn>Сумма</TableColumn>
            <TableColumn>Период</TableColumn>
            <TableColumn>Действия</TableColumn>
          </TableHeader>
          <TableBody>
            {flatPayments.map((flatPayment) => (
              <TableRow key={flatPayment.id} >
                <TableCell>{flatPayment.name}</TableCell>
                <TableCell>{flatPayment.amount} ₽</TableCell>
                <TableCell>{formatDate(flatPayment.period)}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light">
                        <MoreVertical size={20} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem className="text-black" key={`edit-${flatPayment.id}`} startContent={<Edit size={18} />} onPress={() => handleEditFlatPayment(flatPayment)}>
                        Редактировать
                      </DropdownItem>
                      <DropdownItem key={`delete-${flatPayment.id}`} startContent={<Trash2 size={18} />} className="text-danger" onPress={() => handleDeleteClick(flatPayment)}>
                        Удалить
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <FlatPaymentEdit
        isOpen={isFlatPaymentModalOpen}
        onClose={onFlatPaymentModalClose}
        flatPaymentForm={flatPaymentForm}
        setFlatPaymentForm={setFlatPaymentForm}
        handleSaveFlatPayment={handleSaveFlatPayment}
      />

      <FlatPaymentDelete
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        selectedFlatPayment={selectedFlatPayment as IFlatPayment}
        handleDeleteFlatPayment={handleDeleteFlatPayment}
      />
    </div>
  );
}