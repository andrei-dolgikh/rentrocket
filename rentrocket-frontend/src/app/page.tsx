'use client'
import { MainLayout } from '@/components/ui/main/MainLayout'
import { useEffect } from 'react'

export default function Home() {
	useEffect(() => {
	  const handlePopState = () => {
		window.location.reload();
	  };
  
	  window.addEventListener('popstate', handlePopState);
  
	  return () => {
		window.removeEventListener('popstate', handlePopState);
	  };
	}, []);

	return (
		<div className="mx-[30px] max-w-[1000px] lg:mx-auto lg:px-[30px]">
			<MainLayout />
		</div>
	)
}

