import type { PropsWithChildren } from 'react'

export function ResourcePageInfoblock({ params, children }: PropsWithChildren<{ params: { headerText: string; } }>) {
    return (
        <div className='py-[20px]'>
            <div className='lg:text-[32px] text-[18px] text-white mb-4 mx-[30px] lg:mx-[0px] '>{params.headerText}</div>
            <div className='text-[18px] text-white h-fit bg-[#1E1E1E]'>
                {children}
            </div>
        </div>
    )
}