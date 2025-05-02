'use client'
import { useUsers } from '../../app/[lang]/myspace/flats/hooks/useUsers'
import { IUser, roleTranslations } from '@/types/user.types'
import { FlatRentersTable } from '@/components/table/FlatRentersTable'
import Loader from '@/components/Loader'
import { useLanguage } from '../../app/[lang]/languageContext';
// import { createLocalizedUrl } from '../../../utils/utils'
import { IFlatResponse } from '@/types/flat.types'
import { InvitationsTable } from '@/components/table/InvitationsTable'


// const useUsersData = (): { data: { id: string; user: { name: string; login: string; } ; "users:roles": string[] }[], isLoading: boolean } => {
//   const { users, isLoading } = useUsers()
//   const data: { id: string; user: { name: string; login: string; }, "users:roles": string[]; }[] = [];
//   users.map((user) => {
//     const roles = user.roles;
//     let rolesDescription = [] as string[];
//     roles?.map((role) => {
//       rolesDescription.push(roleTranslations[role]);
//     });
//     data.push({
//       id: user.id,
//       user: {
//         name: user.name,
//         login: user.login
//       },
//       "users:roles": rolesDescription
//     })
//   })

//   return { data, isLoading }
// }

const columns = [
  {
    key: "user",
    label: "Пользователь",
  },
  // {
  //   key: "users:roles",
  //   label: "Роль в квартире",
  // },
  {
    key: "users:actions",
    label: "",
  },
];



export function FlatRenters({ flat }: { flat: IFlatResponse }) {
  // const { data, isLoading } = useUsersData()
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();



  return (
  // return isLoading ? (
  //   <Loader />
  // ) : (
    <div className='text-black'>
      <FlatRentersTable columns={columns} rows={flat.renters} flatId={flat.id} />
            <div className='flex justify-between items-center mb-[10px]'>
              <div className='p-5'>
                История приглашений в квартире
              </div>
            </div>
      <InvitationsTable invitations={flat.invitations} actions={false} />
    </div>
  )
}
