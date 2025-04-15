import { FlatRenters } from '@/components/ui/flat/FlatRenters'

export function FlatSettingsRentersTab( { flatId }: { flatId: string }) {
  return (
    <div className='flex flex-col'>
          <FlatRenters  flatId={flatId}/>
    </div>
  )
}