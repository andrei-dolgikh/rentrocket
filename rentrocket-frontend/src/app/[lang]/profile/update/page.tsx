'use client'
import { UpdateUser } from '@/components/user/UpdateUser';
import { useLanguage } from '../../languageContext';
import { useAuth } from '../../authContext';
import Loader from '@/components/Loader'

export default function UpdateProfilePage() {
	const { dictionary }: { dictionary: Record<string, any> } = useLanguage();
	const { isProfileLoadingSuccess, profile, isProfileLoading } = useAuth();

	return (
		<div className=' min-h-screen  mx-[30px] lg:mx-auto lg:px-[30px]'>
			<div className='my-5'>
				{isProfileLoadingSuccess && <UpdateUser user={profile?.user} />
				}
			</div>
		</div>
	)
}
