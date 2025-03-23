'use client';
import { FormEvent,useEffect,useState } from 'react'
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/buttons/Button';
import { Checkbox, CheckboxGroup, Input } from "@heroui/react";
import { TypeUserForm } from '@/types/auth.types';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { Roles, roleTranslations } from '@/types/user.types';
import Loader from '@/components/ui/Loader'
import { Breadcrumbs } from '@/components/ui/breadcrumbs/Breadcrumbs';

export function EditUser({ user }: { user: string }) {
  const { targetUser, isSuccess, isLoading } = useUser({ id: user });
  const { isPending, mutate } = useUpdateUser();
  const [formData, setFormData] = useState({
    login: targetUser?.user?.login,
    roles: targetUser?.user?.roles,
    name: targetUser?.user?.name,
    password: ""
  });

  useEffect(() => {
    if (isSuccess && targetUser) {
      setFormData({
        login: targetUser?.user?.login,
        roles: targetUser?.user?.roles,
        name: targetUser?.user?.name,
        password: ""
      })
    }
  }, [isSuccess, targetUser])

  const handleRolesChange = (selectedRoles: string[]) => {
    setFormData({ ...formData, roles: selectedRoles as Roles[] });
  };

  async function onEditSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      const userData: TypeUserForm = {
        login: formData.login as string,
        password: formData.password as string || undefined,
        roles: formData.roles as Roles[],
        name: formData.name as string
      }
      mutate({id: user, data : userData})
      
  }
  const crumbs = [
    { active: false, name: 'Пользователи', url: '/admin/users' }, 
    { active: true, name: targetUser?.user?.login, url: '' }
  ];

	return isLoading ? (
		<Loader />
	) : (
    <div>
      <div className="flex justify-between">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <form className="" onSubmit={onEditSubmit}>
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
              name='password'
              label="Новый пароль: "
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

          <Button type="submit" disabled={isPending} state={isPending}>
            Сохранить данные пользователя
          </Button>
        </div>
      </form>
    </div>
  );
}