
export function DeltaBadge({ delta }: { delta: number }) {
    // const deltaColor  = delta > 0 ? 'text-green-500' : 'text-red-500'
    const deltaColor  =  'bg-brandGreen'
	return (
		<div className='mx-5px lg:mx-[15px] w-[200px] min-w-[200px] h-[17px] text-white line-height-[17px] text-[10px] overflow-hidden whitespace-nowrap' >
           <span className={`${deltaColor} rounded-xl px-1 py-0.5`}>{delta}%</span>
		</div>
	)
}

export function DeltaChartBadge({ delta }: { delta: number }) {
    // const deltaColor  = delta > 0 ? 'text-green-500' : 'text-red-500'
    const deltaColor  =  'bg-brandGreen'
	return (
		<span className={`${deltaColor} text-[16px] ml-3 rounded-xl px-2 py-1`}>{delta}%</span>
	)
}