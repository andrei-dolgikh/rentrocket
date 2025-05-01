'use client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Loader from '@/components/ui/Loader'
import { useState } from 'react'
import { FormEvent } from 'react'
import { toast } from 'sonner'
import { IRegForm } from '@/types/auth.types'
import { URLS_PAGES } from '@/config/pages-url.config'
import { Card, CardHeader, Input,CardBody} from "@heroui/react";
import { authService } from '@/services/auth.service'
import { useAuth } from '../authContext';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Button } from "@heroui/button";
import { createLocalizedUrl } from '../../../utils/utils'
import Link from 'next/link'
import { useLanguage } from '../../../app/[lang]/languageContext';

export function Register() {
	const { setIsAuthenticated } = useAuth();
	const [formData, setFormData] = useState({
		login: '',
		password: '',
		name: '',
		email: '',
		captcha: 'sds'
	});
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
	const SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_KEY;

	const isFormValid = formData.login !== '' && formData.password !== '' && formData.captcha !== 'sds';


	const router = useRouter()
	const { mutate: auth, isPending: isAuthPending, isSuccess: isAuthSuccess } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IRegForm) =>
			authService.register(data),
		onSuccess() {
			toast.success('Успешный вход!')
			setIsAuthenticated(true);
			router.push(URLS_PAGES.ADMIN_DASHBOARD)
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
		const authData: IRegForm = {
			login: formData.login,
			password: formData.password,
			captcha: formData.captcha,
			name: formData.name,
			email: formData.email
		}
		auth(authData)
	}

	return isAuthPending && isAuthSuccess ? (
		<Loader />
	  ) : (
		<div className="flex justify-center items-center min-h-[80vh]">
		  <Card className="w-full max-w-md shadow-xl">
			<CardHeader className="pb-0 pt-6 px-6 flex flex-col items-center">
			  <h1 className="text-2xl font-bold text-center">Регистрация</h1>
			  <p className="text-default-500 text-sm mt-1">Создайте новую учетную запись</p>
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
					<i className="fas fa-at text-default-400 text-sm" />
				  }
				  classNames={{
					inputWrapper: "border-1"
				  }}
				/>
				
				<Input
				  id="name"
				  label="Имя пользователя"
				  name="name"
				  variant="bordered"
				  radius="sm"
				  size="lg"
				  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				  value={formData.name}
				  autoComplete="name"
				  startContent={
					<i className="fas fa-user text-default-400 text-sm" />
				  }
				  classNames={{
					inputWrapper: "border-1"
				  }}
				/>
				
				<Input
				  id="email"
				  label="Электронная почта"
				  name="email"
				  variant="bordered"
				  radius="sm"
				  size="lg"
				  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				  value={formData.email}
				  autoComplete="email"
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
				  autoComplete="new-password"
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
					color={isFormValid ? "primary" : "default"}
					radius="sm"
					size="lg"
					type="submit"
					disabled={!isFormValid}
					className="w-full font-medium"
				  >
					Создать аккаунт
				  </Button>
				  
				  <div className="relative flex items-center py-2">
					<div className="flex-grow border-t border-gray-600 opacity-30"></div>
					<span className="flex-shrink mx-3 text-default-500 text-sm">или</span>
					<div className="flex-grow border-t border-gray-600 opacity-30"></div>
				  </div>
				  
				  <Link 
					href={createLocalizedUrl(lang, '/login')} 
					className="w-full"
				  >
					<Button
					  color="secondary"
					  variant="flat"
					  radius="sm"
					  size="lg"
					  className="w-full font-medium"
					>
					  Уже есть аккаунт? Войти
					</Button>
				  </Link>
				</div>
				
				<p className="text-center text-default-500 text-sm mt-4">
				  Регистрируясь, вы соглашаетесь с нашими{" "}
				  <Link href={createLocalizedUrl(lang, '/terms')} className="text-primary">
					условиями использования
				  </Link>
				</p>
			  </form>
			</CardBody>
		  </Card>
		</div>
	  );
}
