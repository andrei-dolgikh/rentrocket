'use client';
import { FormEvent, useState } from 'react'
import { Checkbox, CheckboxGroup, Input } from "@heroui/react";
import { Breadcrumbs } from '@/components/ui/breadcrumbs/Breadcrumbs';
import { Button } from '@/components/ui/buttons/Button';
import { TypeUserForm } from '@/types/auth.types';
import { useCreateUser } from '../hooks/useCreateUser';
import { Roles, roleTranslations } from '@/types/user.types';

export function CreateUser() {
    const { createUser } = useCreateUser();

    const [formData, setFormData] = useState({
      login: "",
      roles: [] as Roles[],
      name: "",
      password: ""
    });

    const handleRolesChange = (selectedRoles: string[]) => {
      setFormData({ ...formData, roles: selectedRoles as Roles[] });
    };

    async function onCreateSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      const userData: TypeUserForm = {
        login: formData.login as string,
        password: formData.password as string,
        roles: formData.roles as Roles[],
        name: formData.name as string
      }

    createUser(userData)
        
    }

    const crumbs = [
        { active: false, name: 'Пользователи', url: '/admin/users' }, 
        { active: true, name: "Создание пользователя", url: '' }
    ];

    return (
        <div>
            <div className="flex justify-between">
                <Breadcrumbs crumbs={crumbs} />
            </div>
            <form onSubmit={onCreateSubmit}>
                <div className="flex flex-col">
                <div className="mb-4 flex flex-row justify-between"></div>
                    <div className="flex flex-col">
                        <Input
                            id="login"
                            className="mb-4"
                            label="Логин"
                            name='login'
                            onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                            value={formData.login}
                        />
                        <Input
                            id="name"
                            className="mb-4"
                            label="Имя"
                            name='name'
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            value={formData.name}
                        />
                        <Input
                            id="password"
                            className="mb-4"
                            label="Новый пароль: "
                            name='password'
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            value={formData.password}
                        />
                    </div>


                    <div className="flex gap-4 mb-4">
                        <CheckboxGroup 
                        label="Роли:"  
                        name='roles' 
                        value={formData.roles} 
                        onChange={handleRolesChange}
                        >
                        {Object.values(Roles).map((role, index) => (
                            <Checkbox
                            key={role}
                            value={role}
                            color="primary"
                            >
                            <span className="">{roleTranslations[role]}</span>
                            </Checkbox>
                        ))}
                        </CheckboxGroup>
                    </div>
                    <Button type="submit">Создать пользователя</Button>
                </div>
            </form>
        </div>
    );
}