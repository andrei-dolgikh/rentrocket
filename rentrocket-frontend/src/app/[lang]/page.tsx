// 'use client'
import { MainLayout } from '@/components/ui/main/MainLayout'
// import { useEffect } from 'react'
import { getDictionary } from './dictionaries'

export default async function Home({
	params,
  }: {
	params: Promise<{ lang: 'en' | 'ru' }>
  }) {

	const lang = (await params).lang
	const dict = await getDictionary(lang) 

	// useEffect(() => {
	//   const handlePopState = () => {
	// 	window.location.reload();
	//   };
  
	//   window.addEventListener('popstate', handlePopState);
  
	//   return () => {
	// 	window.removeEventListener('popstate', handlePopState);
	//   };
	// }, []);

	return (
		<div className="mx-[30px] max-w-[1000px] lg:mx-auto lg:px-[30px]">
			
			
			{dict.header.about}
			<MainLayout />
		</div>
	)
}

