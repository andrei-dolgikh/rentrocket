'use client'
import { Button } from "@heroui/button";
import { useUpdateFlat } from '@/hooks/flats/useUpdateFlat'
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs'
import { useState, FormEvent, useEffect } from 'react'
import { useFlat } from '@/hooks/flats/useFlat'
import { IFlatUpdateRequest } from '@/types/flat.types'
import Loader from '@/components/Loader'
import { FlatSettingsGeneralTab } from "@/components/flat/tabs/FlatSettingsGeneralTab";
import { FlatSettingsCountersTab } from "@/components/flat/tabs/FlatSettingsCountersTab";
import { FlatSettingsRentersTab } from "@/components/flat/tabs/FlatSettingsRentersTab";
import { FlatSettingsOwnersTab } from "@/components/flat/tabs/FlatSettingsOwnersTab";
import { FlatSettingsManagersTab } from "@/components/flat/tabs/FlatSettingsManagersTab";
import { Card, Divider } from "@heroui/react";
import { FlatSettingsMenu } from "@/components/flat/FlatSettingsMenu"; 
import { FlatSettingsChatTab } from "@/components/flat/tabs/FlatSettingsChatTab";

export function UpdateFlat(
	{ flatId }:
		{ flatId: string }
) {
	const [formDisabled, setFormDisabled] = useState(true);
	const { updateFlat, isUpdatePending } = useUpdateFlat()
	const { flat, isFlatLoading, isFlatSuccess } = useFlat(flatId)
	const [activeMenu, setActiveMenu] = useState('general');

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


	const handleMenuItemClick = ( itemId: string) => {
		setActiveMenu(itemId);
	};

	const renderContent = () => {
		switch (activeMenu) {
			case 'meter_readings': 
				return <div className="p-4"><FlatSettingsCountersTab flatId={flatId} /></div>;
			case 'bills':
				return <div className="p-4">Содержимое раздела "Платёжки"</div>;
			case 'maintenance':
				return <div className="p-4">Содержимое раздела "Эксплуатация"</div>;
			case 'personal_accounts':
				return <div className="p-4">Содержимое раздела "Личные кабинеты"</div>;

			case 'rent_payment':
				return <div className="p-4">Содержимое раздела "Оплата аренды"</div>;
			case 'photo_reports':
				return <div className="p-4">Содержимое раздела "Фото-отчёты"</div>;
			case 'property':
				return <div className="p-4">Содержимое раздела "Имущество"</div>;
			case 'tenants':
				return <FlatSettingsRentersTab flat={flat} />;
			case 'owners':
				return <FlatSettingsOwnersTab flat={flat} />;
			case 'managers':
				return <FlatSettingsManagersTab flat={flat} />;
			case 'chat':
				return <FlatSettingsChatTab flat={flat} /> ;
			case 'general':
				return <FlatSettingsGeneralTab formData={formData} handleFormChange={handleFormChange}/>;
			case 'property_payment':
				return <div className="p-4">Содержимое раздела "Оплата объекта"</div>;
			case 'notification_settings':
				return <div className="p-4">Содержимое раздела "Настройка уведомлений"</div>;
			case 'useful_contacts':
				return <div className="p-4">Содержимое раздела "Полезные контакты"</div>;
			case 'neighbors':
				return <div className="p-4">Содержимое раздела "Соседи"</div>;
			case 'documents':
				return <div className="p-4">Содержимое раздела "Документы"</div>;
			case 'investments':
				return <div className="p-4">Содержимое раздела "Инвестиции"</div>;
			case 'notes':
				return <div className="p-4">Содержимое раздела "Заметки"</div>;
			case 'internet':
				return <div className="p-4">Содержимое раздела "Интернет и телефон"</div>;
			
			default:
				return <FlatSettingsGeneralTab formData={formData} handleFormChange={handleFormChange}/>;
		}
	};

	return isFlatLoading ? (
		<Loader />
	) : (
			<form
				className=''
				onSubmit={onUpdateSubmit}
			>
				<div className='flex justify-between my-[30px]'>
					<Breadcrumbs crumbs={crumbs} />
					<Button type='submit' color="primary" isDisabled={formDisabled}>Сохранить квартиру</Button>
				</div>

				<div className='flex flex-col md:flex-row gap-6'>
				<FlatSettingsMenu 
				activeMenu={activeMenu}
				onMenuItemClick={handleMenuItemClick}
				/>

					<Card className="flex-1 p-4">
						{renderContent()}
					</Card>
				</div>
			</form>
	)
}