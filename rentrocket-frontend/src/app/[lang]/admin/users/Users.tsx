'use client'
import { useUsers } from './hooks/useUsers'
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import { roleTranslations } from '@/types/user.types'
import Link from 'next/link'
import { UsersTable } from '@/components/ui/table/UsersTable'
import { useState } from 'react';
import Loader from '@/components/ui/Loader'


const useUsersData = (): { data: { id: string; name: string; login: string; "users:roles": string[] }[], isLoading: boolean } => {
  const { users, setUsers, isLoading } = useUsers()
  const data: { id: string; name: string; login: string; "users:roles": string[]; }[] = [];
  users.map((user) => {
    const roles = user.roles;
    let rolesDescription = [] as string[];
    roles?.map((role) => {
      rolesDescription.push(roleTranslations[role]);
    });
    data.push({
      id: user.id,
      name: user.name,
      login: user.login,
      "users:roles": rolesDescription
    })
  })

  return { data, isLoading }
}

const columns = [
  {
    key: "login",
    label: "Логин",
  },
  {
    key: "name",
    label: "Имя",
  },
  {
    key: "flatName",
    label: "Квартира",
  },
  {
    key: "users:roles",
    label: "Роли",
  },
  {
    key: "users:actions",
    label: "",
  },
];



export function Users() {
  const { data, isLoading } = useUsersData()
  const [searchInput, setSearchInput] = useState('');

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchInput.toLowerCase())
  );


  return isLoading ? (
    <Loader />
  ) : (
    <div className='text-black'>
      <div className='flex justify-between items-center mt-[30px] mb-[10px]'>
        <div className='text-[28px] '>
          Юзеры <span className='text-[#999999] text-[14px] ml-2 mr-2'>Всего {filteredData.length}</span>
        </div>
        <div className='flex items-center gap-5'>
          <Link href={'/admin/users/create'}>
            <Button 
              color="primary"
              >
              Добавить пользователя
            </Button>
          </Link>
        <Input
        label="Поиск"
        placeholder="Логин пользователя"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} />
        </div>

      </div>
      <UsersTable columns={columns} rows={filteredData} />
    </div>
  )
}
