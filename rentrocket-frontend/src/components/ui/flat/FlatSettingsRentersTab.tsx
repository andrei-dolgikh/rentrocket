'use client'
import { FlatRenters } from '@/components/ui/flat/FlatRenters'
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardFooter,
  Button,
  Chip,
  Divider
} from "@heroui/react";

export function FlatSettingsRentersTab() {
  return (
    <div className="w-full space-y-6">
      <Card shadow="sm" >
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Оплата аренды</h3>
          <Chip color="secondary">1</Chip>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-sm text-default-500">Настройки оплаты аренды и платежей</p>
        </CardBody>
        <CardFooter className="flex justify-end gap-2">
          <Button color="primary" size="sm">Настроить</Button>
        </CardFooter>
      </Card>
      
      <Card shadow="sm" >
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Фото-отчеты</h3>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-sm text-default-500">Настройки для фото-отчетов</p>
        </CardBody>
        <CardFooter className="flex justify-end gap-2">
          <Button color="primary" size="sm">Настроить</Button>
        </CardFooter>
      </Card>
      
      <Card shadow="sm" >
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Имущество</h3>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-sm text-default-500">Список имущества и его состояние</p>
        </CardBody>
        <CardFooter className="flex justify-end gap-2">
          <Button color="primary" size="sm">Настроить</Button>
        </CardFooter>
      </Card>
      
      <Card shadow="sm" >
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Арендаторы</h3>
          <Chip color="danger">2</Chip>
        </CardHeader>
        <Divider />
        <CardBody>
          <FlatRenters />
        </CardBody>
      </Card>
    </div>
  )
}