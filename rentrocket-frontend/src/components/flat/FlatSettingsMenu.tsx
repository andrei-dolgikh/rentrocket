'use client'
import { Card, Divider } from "@heroui/react";

interface MenuItem {
  id: string;
  label: string;
}

interface MenuCategory {
  id: string;
  label: string;
  subItems: MenuItem[];
}

interface FlatSettingsMenuProps {
  menuItems?: MenuCategory[];
  activeMenu: string;
  onMenuItemClick: (categoryId: string, itemId: string) => void;
}

const defaultMenuItems = [
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
            { id: 'general', label: 'Общие данные' },
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

export function FlatSettingsMenu({ 
  menuItems = defaultMenuItems, 
  activeMenu, 
  onMenuItemClick 
}: FlatSettingsMenuProps) {
  return (
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
                  onClick={() => onMenuItemClick(category.id, item.id)}
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
  );
}