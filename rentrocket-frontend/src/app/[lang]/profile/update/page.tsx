'use client'
import { UpdateUser } from '@/components/ui/user/UpdateUser';
import { useLanguage } from '../../languageContext';
import { useAuth } from '../../authContext';
import Loader from '@/components/ui/Loader'

export default function UpdateProfilePage() {
	const { dictionary }: { dictionary: Record<string, any> } = useLanguage();
	const { isProfileLoadingSuccess, profile, isProfileLoading } = useAuth();

	return (
		<div className='grid min-h-screen max-w-[1000px] mx-[30px] lg:mx-auto lg:px-[30px]'>
			<div className='my-5'>
				{isProfileLoadingSuccess && <UpdateUser user={profile?.user} />
				}
			</div>
		</div>
	)
}
