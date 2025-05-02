import { FlatRenters } from '@/components/flat/FlatRenters'
import { IFlatResponse } from '@/types/flat.types'

export function FlatSettingsRentersTab( { flat }: { flat?: IFlatResponse }) {
  if (!flat) return <div>Квартира не найдена</div>
  return (
    <div className='flex flex-col'>
          <FlatRenters flat={flat}/>
    </div>
  )
}