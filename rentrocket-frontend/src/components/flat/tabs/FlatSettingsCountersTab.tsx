'use client'
import { Input, Textarea } from "@heroui/input";
import { Button, Card, CardBody, CardHeader, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { useState, useEffect } from "react";
import { PlusCircle, MoreVertical, Edit, Trash2, AlertCircle, TrendingUp } from "lucide-react";
import { useCreateCounter } from "@/hooks/counter/useCreateCounter";
import { useUpdateCounter } from "@/hooks/counter/useUpdateCounter";
import { useDeleteCounter } from "@/hooks/counter/useDeleteCounter";
import { useCounters } from "@/hooks/counter/useCounters";
import { ICounter } from "@/types/counter.types";

// interface CounterDto {
//   id?: string;
//   name: string;
// }

interface CounterReadingDto {
    id?: string;
    value: number;
    date: Date;
}

export function FlatSettingsCountersTab({ flatId }: { flatId: string }) {

    const { counters, isCountersLoading } = useCounters(flatId);
    const { createCounter } = useCreateCounter();
    const { updateCounter } = useUpdateCounter();
    const { deleteCounter } = useDeleteCounter();

    // const [counters, setCounters] = useState<CounterDto[]>(formData.counters || []);
    const [selectedCounter, setSelectedCounter] = useState<ICounter | null>(null);
    const [readings, setReadings] = useState<CounterReadingDto[]>([]);

    const { isOpen: isCounterModalOpen, onOpen: onCounterModalOpen, onClose: onCounterModalClose } = useDisclosure();
    const { isOpen: isReadingModalOpen, onOpen: onReadingModalOpen, onClose: onReadingModalClose } = useDisclosure();
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

    const [counterForm, setCounterForm] = useState<ICounter>({
        name: "",
    });

    const [readingForm, setReadingForm] = useState<CounterReadingDto>({
        value: 0,
        date: new Date()
    });

    useEffect(() => {
        if (selectedCounter?.id) {
            const mockReadings = [
                { id: "1", value: 1254, date: new Date(2023, 11, 15) },
                { id: "2", value: 1356, date: new Date(2023, 12, 15) },
                { id: "3", value: 1489, date: new Date(2024, 1, 15) }
            ];
            setReadings(mockReadings);
        }
    }, [selectedCounter]);

    const handleSaveCounter = () => {
        if (counterForm.id) {
            updateCounter({ id: counterForm.id, data: counterForm });
        } else {
            createCounter({ id: flatId, data: counterForm });
        }

        onCounterModalClose();
        setCounterForm({ name: "" });
    };

    const handleDeleteCounter = () => {
        if (!selectedCounter?.id) return;

        deleteCounter(selectedCounter.id);
        onDeleteModalClose();
        setSelectedCounter(null);
    };

    // const handleAddReading = () => {
    //     if (!selectedCounter) return;

    //     const newReading = {
    //         ...readingForm,
    //         id: `temp-${Date.now()}` // In real app, this would be assigned by the backend
    //     };

    //     const updatedReadings = [...readings, newReading];
    //     setReadings(updatedReadings);

    //     const updatedCounters = counters.map(c => 
    //         c.id === selectedCounter.id 
    //             ? { ...c, currentReading: readingForm.value} 
    //             : c
    //     );
    //     setCounters(updatedCounters);
    //     handleFormChange({ ...formData, counters: updatedCounters });

    //     onReadingModalClose();
    //     setReadingForm({ value: 0, date: new Date() });
    // };

    // Format date
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className='flex flex-col gap-6'>
            <Card className="shadow-md border-0">
                <CardHeader className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5">
                    <h2 className="text-xl font-semibold">Управление счетчиками</h2>
                    <Button
                        color="default"
                        variant="flat"
                        startContent={<PlusCircle size={18} />}
                        onClick={() => {
                            setCounterForm({ name: "" });
                            onCounterModalOpen();
                        }}
                    >
                        Добавить счетчик
                    </Button>
                </CardHeader>
                <CardBody>
                    {(counters && counters.length === 0) ? (
                        <div className="text-center py-10">
                            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Нет счетчиков</h3>
                            <p className="text-gray-500 mb-4">Добавьте счетчики для отслеживания показаний</p>
                            <Button
                                color="primary"
                                startContent={<PlusCircle size={18} />}
                                onPress={() => {
                                    setCounterForm({ name: "" });
                                    onCounterModalOpen();
                                }}
                            >
                                Добавить счетчик
                            </Button>
                        </div>
                    ) : (
                        <Table aria-label="Счетчики">
                            <TableHeader>
                                <TableColumn>Название</TableColumn>
                                <TableColumn width={70}><></></TableColumn>
                            </TableHeader>
                            <TableBody>
                                {counters ? counters.map((counter) => (
                                    <TableRow
                                        key={counter.id}
                                        className={`${selectedCounter?.id === counter.id ? "bg-primary-50" : ""} cursor-pointer`}
                                        onClick={() => setSelectedCounter(counter)}
                                    >
                                        <TableCell>{counter.name}</TableCell>
                                        <TableCell>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button
                                                        variant="light"
                                                        isIconOnly
                                                        onPress={(e) => { return false; }}
                                                    >
                                                        <MoreVertical size={18} />
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Действия">
                                                    <DropdownItem
                                                        key={counter.id + "edit"}
                                                        className="text-primary"
                                                        startContent={<Edit size={16} />}
                                                        onPress={() => handleSaveCounter()}
                                                    >
                                                        Редактировать
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        key={counter.id + "delete"}
                                                        startContent={<Trash2 size={16} />}
                                                        className="text-danger"
                                                        onPress={() => {
                                                            setSelectedCounter(counter);
                                                            onDeleteModalOpen();
                                                        }}
                                                    >
                                                        Удалить
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </TableCell>
                                    </TableRow>
                                )) : <></>}
                            </TableBody>
                        </Table>
                    )}
                </CardBody>
            </Card>

            {selectedCounter && (
                <Card className="shadow-md border-0">
                    <CardHeader className="flex justify-between items-center bg-gray-50 p-5">
                        <div>
                            <h3 className="text-lg font-semibold">{selectedCounter.name} - История показаний</h3>
                        </div>
                        <Button
                            color="primary"
                            startContent={<TrendingUp size={18} />}
                            onPress={() => {
                                setReadingForm({ value: 0, date: new Date() });
                                onReadingModalOpen();
                            }}
                        >
                            Внести показания
                        </Button>
                    </CardHeader>
                    <CardBody>
                        {readings.length === 0 ? (
                            <div className="text-center py-10">
                                <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-700 mb-2">Нет данных</h3>
                                <p className="text-gray-500 mb-4">Внесите первые показания счетчика</p>
                                <Button
                                    color="primary"
                                    startContent={<TrendingUp size={18} />}
                                    onPress={() => {
                                        setReadingForm({ value: 0, date: new Date() });
                                        onReadingModalOpen();
                                    }}
                                >
                                    Внести показания
                                </Button>
                            </div>
                        ) : (
                            <Table aria-label="История показаний">
                                <TableHeader>
                                    <TableColumn>Показания</TableColumn>
                                    <TableColumn>Дата</TableColumn>
                                    <TableColumn>Разница</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {readings
                                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                        .map((reading, index, arr) => {
                                            const prevReading = index < arr.length - 1 ? arr[index + 1].value : 0;
                                            const difference = reading.value - prevReading;

                                            return (
                                                <TableRow key={reading.id}>
                                                    <TableCell className="font-medium">{reading.value}</TableCell>
                                                    <TableCell>{formatDate(reading.date)}</TableCell>
                                                    <TableCell>
                                                        {index < arr.length - 1 ? (
                                                            <span className={`font-medium ${difference > 0 ? "text-success" : "text-danger"}`}>
                                                                {difference > 0 ? "+" : ""}{difference}
                                                            </span>
                                                        ) : "-"}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        )}
                    </CardBody>
                </Card>
            )}

            {/* Add/Edit Counter Modal */}
            <Modal
                isOpen={isCounterModalOpen}
                onClose={onCounterModalClose}
                placement="center"
                hideCloseButton={true}
                backdrop="blur"
                className="mx-4 max-w-md text-black"
            >
                <ModalContent>
                    <ModalHeader>{counterForm.id ? "Редактирование счетчика" : "Добавление счетчика"}</ModalHeader>
                    <ModalBody>
                        <div className="space-y-4">
                            <Input
                                label="Название счетчика"
                                placeholder="Например: Счетчик электроэнергии на кухне"
                                value={counterForm.name}
                                onChange={(e) => setCounterForm({ ...counterForm, name: e.target.value })}
                                required
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="flat" color="default" onPress={onCounterModalClose}>
                            Отмена
                        </Button>
                        <Button color="primary" onPress={handleSaveCounter} disabled={!counterForm.name}>
                            Сохранить
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Add Reading Modal */}
            <Modal
                isOpen={isReadingModalOpen}
                onClose={onReadingModalClose}
                placement="center"
                hideCloseButton={true}
                backdrop="blur"
                className="mx-4 max-w-md text-black"
            >
                <ModalContent>
                    <ModalHeader>Внести показания счетчика</ModalHeader>
                    <ModalBody>
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <h3 className="font-medium text-gray-800">{selectedCounter?.name}</h3>
                            </div>
                            <Input
                                type="date"
                                label="Дата снятия показаний"
                                value={readingForm.date instanceof Date
                                    ? readingForm.date.toISOString().split('T')[0]
                                    : new Date().toISOString().split('T')[0]}
                                onChange={(e) => setReadingForm({
                                    ...readingForm,
                                    date: new Date(e.target.value)
                                })}
                            />

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="flat" color="default" onClick={onReadingModalClose}>
                            Отмена
                        </Button>
                        <Button
                            color="primary"
                            // onClick={handleAddReading} 
                            disabled={readingForm.value <= 0}
                        >
                            Сохранить
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} size="sm">
                <ModalContent>
                    <ModalHeader className="text-danger">Удаление счетчика</ModalHeader>
                    <ModalBody>
                        <p>Вы уверены, что хотите удалить счетчик "{selectedCounter?.name}"?</p>
                        <p className="text-sm text-gray-500 mt-2">Все показания этого счетчика будут также удалены. Это действие нельзя отменить.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="flat" color="default" onClick={onDeleteModalClose}>
                            Отмена
                        </Button>
                        <Button color="danger" onClick={handleDeleteCounter}>
                            Удалить
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}