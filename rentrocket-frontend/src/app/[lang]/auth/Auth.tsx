'use client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Loader from '@/components/ui/Loader'
import { useState, useContext } from 'react'
import { FormEvent } from 'react'
import { toast } from 'sonner'
import { useLanguage } from '../../../app/[lang]/languageContext';
// import { Button } from '@/components/ui/buttons/Button'
import { IAuthForm } from '@/types/auth.types'
import { URLS_PAGES } from '@/config/pages-url.config'
import { Input } from '@nextui-org/react';
import { authService } from '@/services/auth.service'
import { AuthContext } from '../authContext';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Button } from "@nextui-org/button";
import Link from 'next/link'

export function Auth() {
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
	const { setIsAuthenticated } = useContext(AuthContext);
	const [formData, setFormData] = useState({
		login: '',
		password: '',
		captcha: 'sds'
	});
	const SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_KEY;

	const isFormValid = formData.login !== '' && formData.password !== '' && formData.captcha !== 'sds';


	const router = useRouter()
	const { mutate: auth, isPending: isAuthPending, isSuccess: isAuthSuccess } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main('login', data),
		onSuccess() {
			toast.success('Успешный вход!')
			setIsAuthenticated(true);
			router.push(lang + URLS_PAGES.MYSPACE)
		},
		onError() {
			toast.error('Failed login!')
		},
		retry: false
	})

	const handleVerificationSuccess = (token: string) => {
		setFormData({ ...formData, captcha: token })
	}

	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const authData: IAuthForm = {
			login: formData.login,
			password: formData.password,
			captcha: formData.captcha
		}
		auth(authData)
	}
	return (isAuthPending && isAuthSuccess) ? (
		<Loader />
	) : (
		<div className='flex '>
			<form
				className='w-[303px] m-auto rounded-xl min-h-full py-[50px]'
				onSubmit={onSubmit}
			>
				<Input
					id="login"
					className="mb-4 min-w-[303px]"
					label="Логин:"
					name='login'
					onChange={(e) => setFormData({ ...formData, login: e.target.value })}
					value={formData.login}
					autoComplete={"username"}
				/>
				<Input
					id="password"
					className="mb-4 min-w-[303px] "
					label="Пароль:"
					name='password'
					type='password'
					onChange={(e) => setFormData({ ...formData, password: e.target.value })}
					value={formData.password}
					autoComplete={"current-password"}
				/>
				<div className='w-[303px] my-[50px] mx-auto'>
					<HCaptcha
						sitekey={SITE_KEY as string}
						onVerify={handleVerificationSuccess}
					/>
				</div>

				<div className='flex flex-col gap-5 justify-center  min-w-[303px]'>

					<Button
						color={isFormValid ? "primary" : "default"}
						radius="md"
						size="lg"
						className=' m-auto w-full'
						type='submit'
						disabled={!isFormValid}
					>Вход</Button>

					<Link href="/register" className=' text-center text-[#fff]'>
					<Button
						color={"primary"}
						radius="md"
						size="lg"
						className=' m-auto w-full'
					>Регистрация</Button>
					</Link>

				</div>
			</form>
		</div>
	)
}
