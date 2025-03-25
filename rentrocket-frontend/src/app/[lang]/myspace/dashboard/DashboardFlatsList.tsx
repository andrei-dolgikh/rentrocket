'use client'
import { useFlats } from '../../myspace/flats/hooks/useFlats'
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
      key: "dashboardMarket:updatedAt",
      label: "Информация обновлена",
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
      "dashboardMarket:updatedAt": getFormattedDate(flat.updatedAt),
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