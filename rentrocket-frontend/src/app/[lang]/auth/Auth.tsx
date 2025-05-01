'use client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Loader from '@/components/ui/Loader'
import { useState } from 'react'
import { FormEvent } from 'react'
import { toast } from 'sonner'
import { useLanguage } from '../../../app/[lang]/languageContext';
import { IAuthForm } from '@/types/auth.types'
import { Card, Input, CardHeader, CardBody } from "@heroui/react";
import { authService } from '@/services/auth.service'
import { useAuth } from '../authContext';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Button } from "@heroui/button";
import { createLocalizedUrl } from '../../../utils/utils'
import Link from 'next/link'

export function Auth() {
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
	const { setIsAuthenticated } = useAuth();
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
			authService.auth(data),
		onSuccess() {
			toast.success('Успешный вход!')
			setIsAuthenticated(true);
			router.push(createLocalizedUrl(lang, '/myspace'))
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
	return isAuthPending && isAuthSuccess ? (
		<Loader />
	) : (
		<div className="flex justify-center items-center min-h-[80vh]">
			<Card className="w-full max-w-md shadow-xl">
				<CardHeader className="pb-0 pt-6 px-6 flex flex-col items-center">
					<h1 className="text-2xl font-bold text-center">Вход в систему</h1>
					<p className="text-default-500 text-sm mt-1">Введите данные для авторизации</p>
				</CardHeader>

				<CardBody className="px-6 py-4">
					<form
						className="flex flex-col gap-4"
						onSubmit={onSubmit}
					>
						<Input
							id="login"
							label="Логин"
							name="login"
							variant="bordered"
							radius="sm"
							size="lg"
							onChange={(e) => setFormData({ ...formData, login: e.target.value })}
							value={formData.login}
							autoComplete="username"
							startContent={
								<i className="fas fa-user text-default-400 text-sm" />
							}
							classNames={{
								inputWrapper: "border-1"
							}}
						/>

						<Input
							id="password"
							label="Пароль"
							name="password"
							type="password"
							variant="bordered"
							radius="sm"
							size="lg"
							onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							value={formData.password}
							autoComplete="current-password"
							startContent={
								<i className="fas fa-lock text-default-400 text-sm" />
							}
							classNames={{
								inputWrapper: "border-1"
							}}
						/>

						<div className="flex justify-center my-4">
							<HCaptcha
								sitekey={SITE_KEY as string}
								onVerify={handleVerificationSuccess}
							/>
						</div>

						<div className="flex flex-col gap-3 mt-2">
							<Button
								color={isFormValid ? "success" : "default"}
								radius="sm"
								size="lg"
								type="submit"
								disabled={!isFormValid}
								className="w-full font-medium"
							>
								Войти
							</Button>

							<div className="relative flex items-center py-2">
								<div className="flex-grow border-t border-gray-600 opacity-30"></div>
								<span className="flex-shrink mx-3 text-default-500 text-sm">или</span>
								<div className="flex-grow border-t border-gray-600 opacity-30"></div>
							</div>

							<Link
								href={createLocalizedUrl(lang, '/register')}
								className="w-full"
							>
								<Button
									color="secondary"
									variant="flat"
									radius="sm"
									size="lg"
									className="w-full font-medium"
								>
									Зарегистрироваться
								</Button>
							</Link>
						</div>

						<p className="text-center text-default-500 text-sm mt-4">
							Забыли пароль? <Link href={createLocalizedUrl(lang, '/reset-password')} className="text-primary">Восстановить</Link>
						</p>
					</form>
				</CardBody>
			</Card>
		</div>
	);
}
