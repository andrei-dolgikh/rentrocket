import { FlatOwners } from '@/components/flat/FlatOwners'
import { IFlatResponse } from '@/types/flat.types'

export function FlatSettingsOwnersTab( { flat }: { flat?: IFlatResponse }) {
  if (!flat) return <div>Квартира не найдена</div>
  return (
    <div className='flex flex-col'>
          <FlatOwners flat={flat}/>
    </div>
  )
}