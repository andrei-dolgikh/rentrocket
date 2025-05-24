'use client'
import { useState, useEffect } from "react";
import { Button, Card, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Input } from "@heroui/input";
import { PlusCircle, MoreVertical, Edit, Trash2 } from "lucide-react";
import { IFlatResponse } from '@/types/flat.types'
import { Divider } from "@heroui/react";

// You would need to create these hooks for your bills functionality
// import { useUtilityBills } from "@/hooks/bills/useUtilityBills";
// import { useCreateBill } from "@/hooks/bills/useCreateBill";
// import { useUpdateBill } from "@/hooks/bills/useUpdateBill";
// import { useDeleteBill } from "@/hooks/bills/useDeleteBill";

// Define interfaces for your bill types
interface IBill {
  id?: string;
  name: string;
  amount: number;
  dueDate: Date;
  description?: string;
}

export function FlatSettingsPaymentsTab({ flat }: { flat?: IFlatResponse }) {
  if (!flat) return <div>Квартира не найдена</div>

  // Uncomment when you have real hooks
  // const { bills, isBillsLoading } = useUtilityBills(flat.id);
  // const { createBill } = useCreateBill();
  // const { updateBill } = useUpdateBill();
  // const { deleteBill } = useDeleteBill();

  // Mock data for demonstration
  const [bills, setBills] = useState<IBill[]>([
    { id: '1', name: 'Электричество', amount: 2500, dueDate: new Date()},
    { id: '2', name: 'Вода', amount: 1200, dueDate: new Date()},
  ]);
  
  const [selectedBill, setSelectedBill] = useState<IBill | null>(null);
  const [billForm, setBillForm] = useState<IBill>({
    name: "",
    amount: 0,
    dueDate: new Date(),
  });

  const { isOpen: isBillModalOpen, onOpen: onBillModalOpen, onClose: onBillModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  const handleAddBill = () => {
    setBillForm({
      name: "",
      amount: 0,
      dueDate: new Date(),
    });
    onBillModalOpen();
  };

  const handleEditBill = (bill: IBill) => {
    setBillForm(bill);
    onBillModalOpen();
  };

  const handleDeleteClick = (bill: IBill) => {
    setSelectedBill(bill);
    onDeleteModalOpen();
  };

  const handleSaveBill = () => {
    if (billForm.id) {
      // updateBill({ id: billForm.id, data: billForm });
      
      // Mock update for demonstration
      setBills(prevBills => 
        prevBills.map(bill => bill.id === billForm.id ? billForm : bill)
      );
    } else {
      // createBill({ id: flat.id, data: billForm });
      
      // Mock create for demonstration
      const newBill = { ...billForm, id: Date.now().toString() };
      setBills(prevBills => [...prevBills, newBill]);
    }

    onBillModalClose();
  };

  const handleDeleteBill = () => {
    if (!selectedBill?.id) return;

    // deleteBill(selectedBill.id);
    
    // Mock delete for demonstration
    setBills(prevBills => prevBills.filter(bill => bill.id !== selectedBill.id));
    onDeleteModalClose();
    setSelectedBill(null);
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
          <Button color="primary" startContent={<PlusCircle size={20} />} onClick={handleAddBill}>
            Добавить квитанцию
          </Button>
        </div>
        <Divider />
        
        <Table aria-label="Utility Bills Table">
          <TableHeader>
            <TableColumn>Название</TableColumn>
            <TableColumn>Сумма</TableColumn>
            <TableColumn>Срок оплаты</TableColumn>
            <TableColumn>Действия</TableColumn>
          </TableHeader>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id} >
                <TableCell>{bill.name}</TableCell>
                <TableCell>{bill.amount} ₽</TableCell>
                <TableCell>{formatDate(bill.dueDate)}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light">
                        <MoreVertical size={20} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem className="text-black" key={`edit-${bill.id}`} startContent={<Edit size={18} />} onPress={() => handleEditBill(bill)}>
                        Редактировать
                      </DropdownItem>
                      <DropdownItem key={`delete-${bill.id}`} startContent={<Trash2 size={18} />} className="text-danger" onPress={() => handleDeleteClick(bill)}>
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

      {/* Add/Edit Bill Modal */}
      <Modal isOpen={isBillModalOpen} onClose={onBillModalClose} className="text-black">
        <ModalContent>
          <ModalHeader>{billForm.id ? 'Редактировать квитанцию' : 'Добавить квитанцию'}</ModalHeader>
          <ModalBody>
            <Input
              label="Название"
              value={billForm.name}
              onChange={(e) => setBillForm({ ...billForm, name: e.target.value })}
              className="mb-4"
            />
            <Input
              type="number"
              label="Сумма"
              value={billForm.amount.toString()}
              onChange={(e) => setBillForm({ ...billForm, amount: parseFloat(e.target.value) })}
              className="mb-4"
            />
            <Input
              type="date"
              label="Срок оплаты"
              value={new Date(billForm.dueDate).toISOString().split('T')[0]}
                            onChange={(e) => setBillForm({ ...billForm, dueDate: new Date(e.target.value) })}
              className="mb-4"
            />
            <Input
              label="Описание (необязательно)"
              value={billForm.description}
              onChange={(e) => setBillForm({ ...billForm, description: e.target.value })}
              className="mb-4"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onBillModalClose}>
              Отмена
            </Button>
            <Button color="primary" onClick={handleSaveBill}>
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
        <ModalContent>
          <ModalHeader>Подтверждение удаления</ModalHeader>
          <ModalBody>
            <p>Вы уверены, что хотите удалить квитанцию "{selectedBill?.name}"?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onClick={onDeleteModalClose}>
              Отмена
            </Button>
            <Button color="danger" onClick={handleDeleteBill}>
              Удалить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}