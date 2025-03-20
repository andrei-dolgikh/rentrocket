'use client'
import { useFlats } from '../../../../app/[lang]/admin/flats/hooks/useFlats'
import { IFlatResponse } from '@/types/flat.types'
import { DashboardTable } from '@/components/ui/table/DashboardTable'
import { format } from 'date-fns';

function getFormattedDate(date?: any) {
  if (!date) return ''
  return format(new Date(date), 'dd/MM/yy HH:mm');
}


export function DashboardFlatsList() {
  const { flats } = useFlats()

  const columns = [
    {
      key: "flatsDashboard:name",
      label: "Название квартиры",
    },
    {
      key: "flatsDashboard:views",
      label: "Просмотры",
    },
    {
      key: "flatsDashboard:reviews",
      label: "Отзывы",
    },
    {
      key: "flatsDashboard:updatedAt",
      label: "Информация обновлена",
    },
    {
      key: "flatsDashboard:recommendedFlag",
      label: "Рекомендовано",
    },
    {
      key: "flatsDashboard:actions",
      label: "",
    },
  ];

  function getFlatData(flat: IFlatResponse) {
    return {
      "key": flat.id,
      "flatsDashboard:name": flat.name,
      "flatsDashboard:views": flat.viewsCount,
      "flatsDashboard:reviews": flat.commentsCount,
      "flatsDashboard:updatedAt": getFormattedDate(flat.updatedAt),
      "flatsDashboard:recommendedFlag": flat.recommended ? <span className='text-[#30D158]'>Да</span> : <span className='text-[#999999]'>Нет</span>,
    }
  }

  return (
    <>
      <DashboardTable
        columns={columns}
        rows={flats?.map((flat) => getFlatData(flat))}
      />


    </>
  );
}