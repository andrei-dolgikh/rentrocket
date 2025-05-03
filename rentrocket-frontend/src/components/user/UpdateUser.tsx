'use client'
import { Button } from "@heroui/button";
import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useState, FormEvent } from 'react'
import { IUserUpdateRequest } from '@/types/user.types'
import { Input, Card, CardHeader, CardBody, Divider, Avatar } from "@heroui/react";
import { IUser } from "@/types/auth.types";
import { User, Mail, Phone, Save } from "lucide-react";

export function UpdateUser({ user }: { user: IUser }) {
  const [formDisabled, setFormDisabled] = useState(true);
  const { updateUser, isUpdateUserPending } = useUpdateUser();

  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    primaryPhone: user?.primaryPhone
  });

  async function onUpdateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const userData: IUserUpdateRequest = {
      name: formData.name as string,
      email: formData.email as string,
      primaryPhone: formData.primaryPhone as string,
    }

    updateUser({ id: user.id, data: userData });
    setFormDisabled(true);
  };

  const handleFormChange = (data: any) => {
    setFormData({ ...formData, ...data });
    setFormDisabled(false);
  };

  const initials = user?.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg overflow-hidden border-0">
      <CardHeader className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-4">
        <Avatar 
          className="h-16 w-16 text-lg border-2 border-white bg-gradient-to-br from-indigo-500 to-purple-700 text-white"
          name={initials}
        />
        <div className="text-white">
          <h2 className="text-xl font-bold">Редактирование профиля</h2>
          <p className="text-white/80">Обновите свои персональные данные</p>
        </div>
      </CardHeader>
      
      <CardBody className="p-6">
        <form onSubmit={onUpdateSubmit}>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  id="name"
                  label="Имя"
                  value={formData.name}
                  onChange={(e) => handleFormChange({ name: e.target.value })}
                  name="name"
                  variant="bordered"
                  startContent={<User className="text-gray-400" size={18} />}
                  className="w-full"
                />
              </div>
              
              <div className="relative">
                <Input
                  id="email"
                  label="Email"
                  value={formData.email}
                  onChange={(e) => handleFormChange({ email: e.target.value })}
                  name="email"
                  variant="bordered"
                  startContent={<Mail className="text-gray-400" size={18} />}
                  className="w-full"
                />
              </div>
              
              <div className="relative">
                <Input
                  id="primaryPhone"
                  label="Телефон"
                  value={formData.primaryPhone}
                  onChange={(e) => handleFormChange({ primaryPhone: e.target.value })}
                  name="primaryPhone"
                  variant="bordered"
                  startContent={<Phone className="text-gray-400" size={18} />}
                  className="w-full"
                />
              </div>
            </div>
            
            <Divider className="my-4" />
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                color="primary" 
                isDisabled={formDisabled || isUpdateUserPending}
                isLoading={isUpdateUserPending}
                startContent={<Save size={18} />}
                className="px-6"
              >
                Сохранить профиль
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}