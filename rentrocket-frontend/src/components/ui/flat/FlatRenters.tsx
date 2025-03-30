'use client'
import { useUsers } from '../../../app/[lang]/myspace/flats/hooks/useUsers'
import {Button} from "@heroui/button";
import { roleTranslations } from '@/types/user.types'
import Link from 'next/link'
import { FlatUsersTable } from '@/components/ui/table/FlatUsersTable'
import Loader from '@/components/ui/Loader'
import { useLanguage } from '../../../app/[lang]/languageContext';
import { createLocalizedUrl } from '../../../utils/utils'


const useUsersData = (): { data: { id: string; user: { name: string; login: string; } ; "users:roles": string[] }[], isLoading: boolean } => {
  const { users, isLoading } = useUsers()
  const data: { id: string; user: { name: string; login: string; }, "users:roles": string[]; }[] = [];
  users.map((user) => {
    const roles = user.roles;
    let rolesDescription = [] as string[];
    roles?.map((role) => {
      rolesDescription.push(roleTranslations[role]);
    });
    data.push({
      id: user.id,
      user: {
        name: user.name,
        login: user.login
      },
      "users:roles": rolesDescription
    })
  })

  return { data, isLoading }
}

const columns = [
  {
    key: "user",
    label: "Арендатор",
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



export function FlatRenters() {
  const { data, isLoading } = useUsersData()
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();



  return isLoading ? (
    <Loader />
  ) : (
    <div className='text-black'>
      <div className='flex justify-between items-center mt-[30px] mb-[10px]'>
        <div className='flex items-center gap-5'>
          <Link href={createLocalizedUrl(lang, '/myspace/users/create')}>
            <Button 
              color="primary"
              >
              Добавить арендатора
            </Button>
          </Link>
        </div>

      </div>
      <FlatUsersTable columns={columns} rows={data} />
    </div>
  )
}
