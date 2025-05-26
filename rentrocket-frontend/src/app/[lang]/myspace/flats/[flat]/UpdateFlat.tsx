'use client'
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs'
import { useState, FormEvent, useEffect } from 'react'
import Loader from '@/components/Loader'
import { FlatSettingsGeneralTab } from "@/components/flat/tabs/FlatSettingsGeneralTab";
import { FlatSettingsCountersTab } from "@/components/flat/tabs/FlatSettingsCountersTab";
import { FlatSettingsRentersTab } from "@/components/flat/tabs/FlatSettingsRentersTab";
import { FlatSettingsOwnersTab } from "@/components/flat/tabs/FlatSettingsOwnersTab";
import { FlatSettingsManagersTab } from "@/components/flat/tabs/FlatSettingsManagersTab";
import { Card, Divider } from "@heroui/react";
import { FlatSettingsMenu } from "@/components/flat/FlatSettingsMenu"; 
import { FlatSettingsChatTab } from "@/components/flat/tabs/FlatSettingsChatTab";
import { FlatSettingsPaymentsTab } from "@/components/flat/tabs/FlatSettingsPaymentsTab";
import { useFlat } from '@/hooks/flats/useFlat'

export function UpdateFlat(
	{ flatId }:
		{ flatId: string }
) {
	const [activeMenu, setActiveMenu] = useState('general');
	const { flat, isFlatLoading, isFlatSuccess } = useFlat(flatId)

	const crumbs = [
		{ active: true, name: flat?.name, url: '/' }
	]

	const handleMenuItemClick = ( itemId: string) => {
		setActiveMenu(itemId);
	};

	const renderContent = () => {
		switch (activeMenu) {
			case 'meter_readings': 
				return <div className="p-4"><FlatSettingsCountersTab flatId={flatId} /></div>;
			case 'bills':
				return <div className="p-4"><FlatSettingsPaymentsTab flat={flat} /></div>;
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
				return <FlatSettingsGeneralTab flat={flat}/>;
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
				return <FlatSettingsGeneralTab flat={flat}/>;
		}
	};

	return isFlatLoading ? (
		<Loader />
	) : (
		<>
		<div className='flex justify-between my-[30px]'>
			<Breadcrumbs crumbs={crumbs} />
			{/* <Button type='submit' color="primary" isDisabled={formDisabled}>Сохранить квартиру</Button> */}
		</div>

		<div className='flex flex-col md:flex-row gap-6'>
		<FlatSettingsMenu 
		activeMenu={activeMenu}
		onMenuItemClick={handleMenuItemClick}
		/>

			<div className="flex-1 p-4">
				{renderContent()}
			</div>
		</div>
		</>
	)
}