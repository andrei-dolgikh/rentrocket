'use client'
import { Button } from "@heroui/button";
import { useUpdateUser } from '../../../hooks/useUpdateUser'
import { useState, FormEvent, useEffect } from 'react'
import { IUserUpdateRequest } from '@/types/user.types'
import { Input } from "@heroui/react";
import { IUser } from "@/types/auth.types";

export function UpdateUser(
	{ user}:{ user: IUser }
) {
	const [formDisabled, setFormDisabled] = useState(true);
	const { updateUser, isUpdateUserPending } = useUpdateUser()


    const [formData, setFormData] = useState({
		name: user?.name,
		email: user?.email,
		primaryPhone: user?.primaryPhone
    });

	async function onUpdateSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const userData: IUserUpdateRequest = {
			name: formData.name as string,
			email: formData.email as string,
			primaryPhone: formData.primaryPhone as string,
		}

		updateUser({ id: user.id, data: userData });
		setFormDisabled(true);
	};

	const handleFormChange = (data: any) => {
		setFormData({ ...formData, ...data })
		setFormDisabled(false);
	};

	return (
		<div className="flex flex-row">
			<form
				className='mx-auto'
				onSubmit={onUpdateSubmit}
			>
				<div className='flex justify-between my-[30px]'>
					<Button type='submit' color="primary" isDisabled={formDisabled}>Сохранить профиль</Button>
				</div>

				<div className='flex flex-col md:flex-row gap-6'>

					<div className='flex flex-col'>
						<div className='flex flex-row gap-6'>
							<div className='flex flex-col'>
								<div className='flex flex-col'>
									<Input
										id='name'
										label="Имя"
										value={formData.name}
										onChange={(e) => handleFormChange({ name: e.target.value })}
										name='name' />
								</div>
								<div className='flex flex-col'>
									<Input
										id='email'
										label="Email"
										value={formData.email}
										onChange={(e) => handleFormChange({ email: e.target.value })}
										name='email' />
								</div>
								<div className='flex flex-col'>
									<Input
										id='primaryPhone'
										label="Телефон"
										value={formData.primaryPhone}
										onChange={(e) => handleFormChange({ primaryPhone: e.target.value })}
										name='primaryPhone' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}