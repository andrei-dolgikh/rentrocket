import type { PropsWithChildren } from 'react'
import { GlobalLoader } from '../header/GlobalLoader'

export default function AdminLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<>
		<GlobalLoader />
		{/* <div className='grid min-h-screen max-w-[1000px] mx-[30px]  lg:mx-auto lg:px-[30px]'> */}
			<main className='   relative'>
				{children}
			</main>
		{/* </div> */}
		</>
	)
}