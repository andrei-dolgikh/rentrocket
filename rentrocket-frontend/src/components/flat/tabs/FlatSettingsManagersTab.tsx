import { FlatManagers } from '@/components/flat/FlatManagers'
import { IFlatResponse } from '@/types/flat.types'

export function FlatSettingsManagersTab( { flat }: { flat?: IFlatResponse }) {
  if (!flat) return <div>Квартира не найдена</div>
  return (
    <div className='flex flex-col'>
          <FlatManagers flat={flat}/>
    </div>
  )
}