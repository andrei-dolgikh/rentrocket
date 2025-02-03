
import Link from 'next/link'
import { IMenuItem } from './menu.interface'

export function MenuItem({ item }: { item: IMenuItem }) {
	const isLinkClickable = item.link !== undefined
	return (
		<>
				<Link href={item.link || '/'} className=''>
					<div className={`py-[5px] cursor-pointer ${isLinkClickable ? '' : 'pointer-events-none'}`}>
						<div className='flex flex-col lg:pl-[30px]'>
							<div><item.icon size={28} className='mx-auto lg:hidden' /></div>
							<div className="mt-[5px]">{item.name}</div>
						</div>
					</div>
				</Link>
		</>
	)
}