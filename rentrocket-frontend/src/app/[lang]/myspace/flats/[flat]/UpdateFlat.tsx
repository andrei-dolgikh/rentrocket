'use client'
import { Button } from "@heroui/button";
import { useUpdateFlat } from '../../../myspace/flats/hooks/useUpdateFlat'
import { Breadcrumbs } from '@/components/ui/breadcrumbs/Breadcrumbs'
import { useState, FormEvent, useEffect } from 'react'
import { useFlat } from '../../../myspace/flats/hooks/useFlat'
import { IFlatUpdateRequest } from '@/types/flat.types'
import Loader from '@/components/ui/Loader'
import { FlatSettingsGeneralTab } from "@/components/ui/flat/FlatSettingsGeneralTab";
import { FlatSettingsPhotosTab } from "@/components/ui/flat/FlatSettingsPhotosTab";
import { FlatSettingsRentersTab } from "@/components/ui/flat/FlatSettingsRentersTab";
import { Card, Divider } from "@heroui/react";

export function UpdateFlat(
	{ flatId }:
		{ flatId: string }
) {
	const [formDisabled, setFormDisabled] = useState(true);
	const { updateFlat, isUpdatePending } = useUpdateFlat()
	const { flat, isFlatLoading, isFlatSuccess } = useFlat(flatId)
	const [activeMenu, setActiveMenu] = useState('general');
	const [activeCategoryId, setActiveCategoryId] = useState('settings');

	const crumbs = [
		{ active: true, name: flat?.name, url: '/' }
	]

	const [formData, setFormData] = useState({
		name: flat?.name,
		order: flat?.order,
		description: flat?.description,
		iconUrl: flat?.iconUrl,
		address: flat?.address,
		entergroup: flat?.entergroup,
		chambres: flat?.chambres,
		size: flat?.size,
		images: flat?.images,
	});

	useEffect(() => {
		if (flat && isFlatSuccess) {
			setFormData({
				name: flat?.name,
				order: flat?.order,
				description: flat?.description,
				iconUrl: flat?.iconUrl,
				address: flat?.address,
				entergroup: flat?.entergroup,
				chambres: flat?.chambres,
				size: flat?.size,
				images: flat?.images,
			})
		}
	}, [isFlatSuccess, flat])

	async function onUpdateSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const userData: IFlatUpdateRequest = {
			name: formData.name as string,
			order: formData.order,
			description: formData.description as string,
			iconUrl: formData?.iconUrl,
			address: formData?.address,
			entergroup: formData?.entergroup,
			chambres: formData?.chambres as number,
			size: formData?.size as number,
			images: formData?.images,
		}

		updateFlat({ id: flatId, data: userData });
		setFormDisabled(true);
	};

	const handleFormChange = (data: any) => {
		setFormData({ ...formData, ...data })
		setFormDisabled(false);
	};

	const menuItems = [
		{
			id: 'utilities',
			label: 'Коммунальные услуги',
			subItems: [
				{ id: 'meter_readings', label: 'Показания счётчиков' },
				{ id: 'bills', label: 'Платёжки' },
				{ id: 'maintenance', label: 'Эксплуатация' },
				{ id: 'personal_accounts', label: 'Личные кабинеты' }
			]
		},
		{
			id: 'rent',
			label: 'Аренда',
			subItems: [
				{ id: 'rent_payment', label: 'Оплата аренды' },
				{ id: 'photo_reports', label: 'Фото-отчёты' },
				{ id: 'property', label: 'Имущество' },
				{ id: 'tenants', label: 'Арендаторы' },
				{ id: 'chat', label: 'Чат' }
			]
		},
		{
			id: 'about',
			label: 'Об объекте',
			subItems: [
				{ id: 'general_data', label: 'Общие данные' },
				{ id: 'property_payment', label: 'Оплата объекта' },
				{ id: 'notification_settings', label: 'Настройка уведомлений' },
				{ id: 'useful_contacts', label: 'Полезные контакты' },
				{ id: 'neighbors', label: 'Соседи' },
				{ id: 'documents', label: 'Документы' },
				{ id: 'investments', label: 'Инвестиции' },
				{ id: 'notes', label: 'Заметки' },
				{ id: 'internet', label: 'Интернет и телефон' }
			]
		}
	];

	// Handle menu item click
	const handleMenuItemClick = (categoryId: string, itemId: string) => {
		setActiveCategoryId(categoryId);
		setActiveMenu(itemId);
	};

	// Render content based on active menu
	const renderContent = () => {
		switch (activeMenu) {
			case 'general':
				return <FlatSettingsGeneralTab formData={formData} handleFormChange={handleFormChange}/>;
			case 'tenants':
				return <FlatSettingsRentersTab flatId={flatId} />;
			case 'utilities':
				return <div className="p-4">Содержимое раздела "Коммунальные услуги"</div>;
			case 'about':
				return <FlatSettingsPhotosTab formData={formData} handleFormChange={handleFormChange} />;
			default:
				return <FlatSettingsGeneralTab formData={formData} handleFormChange={handleFormChange}/>;
		}
	};

	return isFlatLoading ? (
		<Loader />
	) : (
		<div className="flex flex-row">
			<form
				className='mx-auto'
				onSubmit={onUpdateSubmit}
			>
				<div className='flex justify-between my-[30px]'>
					<Breadcrumbs crumbs={crumbs} />
					<Button type='submit' color="primary" isDisabled={formDisabled}>Сохранить квартиру</Button>
				</div>

				<div className='flex flex-col md:flex-row gap-6'>
					<Card className="w-64 h-fit">
						<div className="p-2">
							{menuItems.map((category, index) => (
								<div key={category.id} className="mb-3">
									<h3 className="font-medium text-default-700 text-md px-2 py-1">{category.label}</h3>
									<ul>
										{category.subItems.map(item => (
											<li
												key={item.id}
												className={`
                                                    py-2 px-3 rounded-md cursor-pointer text-sm transition-colors
                                                    ${activeMenu === item.id
														? 'bg-primary-50 text-primary-600 font-medium'
														: 'text-default-600 hover:bg-default-100'}
                                                `}
												onClick={() => handleMenuItemClick(category.id, item.id)}
											>
												{item.label}
											</li>
										))}
									</ul>
									{index < menuItems.length - 1 && <Divider className="my-2" />}
								</div>
							))}
						</div>
					</Card>

					<Card className="flex-1 p-4">
						{renderContent()}
					</Card>
				</div>
			</form>
		</div>
	)
}