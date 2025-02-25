'use client'
import { useFlats } from '@/app/admin/flats/hooks/useFlats'
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
      key: "dashboardMarket:name",
      label: "Название",
    },
    {
      key: "dashboardMarket:views",
      label: "Просмотры",
    },
    {
      key: "dashboardMarket:reviews",
      label: "Отзывы",
    },
    {
      key: "dashboardMarket:rate",
      label: "Общая оценка",
    },
    {
      key: "dashboardMarket:updatedAt",
      label: "Информация обновлена",
    },
    {
      key: "dashboardMarket:parserFlag",
      label: "Парсер",
    },
    {
      key: "dashboardMarket:recommendedFlag",
      label: "Рекомендовано",
    },
    {
      key: "dashboardMarket:actions",
      label: "",
    },
  ];

  function getFlatData(flat: IFlatResponse) {
    return {
      "key": flat.id,
      "dashboardMarket:name": flat.name,
      "dashboardMarket:views": flat.viewsCount,
      "dashboardMarket:reviews": flat.commentsCount,
      "dashboardMarket:rate": flat.rating,
      "dashboardMarket:updatedAt": getFormattedDate(flat.updatedAt),
      "dashboardMarket:parserFlag": false,
      "dashboardMarket:recommendedFlag": flat.recommended ? <span className='text-[#30D158]'>Да</span> : <span className='text-[#999999]'>Нет</span>,
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