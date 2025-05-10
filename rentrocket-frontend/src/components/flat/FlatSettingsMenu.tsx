'use client'
import { Card, Divider, Button, Navbar } from "@heroui/react";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

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
  onMenuItemClick: (itemId: string) => void;
}

const defaultMenuItems = [
    {
        id: 'team',
        label: 'Пользователи квартиры',
        subItems: [
            { id: 'owners', label: 'Собственники' },
            { id: 'managers', label: 'Менеджеры' },
            { id: 'tenants', label: 'Арендаторы' },
        ]
    },
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Find the active category and item
  const activeCategory = menuItems.find(category => 
    category.subItems.some(item => item.id === activeMenu)
  );
  
  const activeItem = activeCategory?.subItems.find(item => 
    item.id === activeMenu
  );

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      {isMobile && (
        <div className="mb-4">
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            color="primary"
            variant="flat"
            className="w-full flex justify-between items-center p-3"
            endContent={isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          >
            <div className="flex items-center">
              <span className="font-medium">
                {activeItem ? activeItem.label : "Меню настроек"}
              </span>
            </div>
          </Button>
        </div>
      )}

      {/* Menu Card - hidden on mobile when closed */}
      <div className={`transition-all duration-300 ${isMobile && !isMenuOpen ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-[2000px] opacity-100'}`}>
        <Card className="w-full md:w-64 h-fit shadow-md border border-gray-200">
          <div className="p-3">
            {menuItems.map((category, index) => (
              <div key={category.id} className="mb-3">
                <h3 className="font-medium text-gray-800 text-md px-2 py-2 bg-gray-50 rounded-md">
                  {category.label}
                </h3>
                <ul className="mt-2 space-y-1">
                  {category.subItems.map(item => (
                    <li
                      key={item.id}
                      className={`
                        py-2 px-3 rounded-md cursor-pointer text-sm transition-colors flex items-center
                        ${activeMenu === item.id
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium border-l-4 border-blue-500'
                          : 'text-gray-600 hover:bg-gray-50'}
                      `}
                      onClick={() => {
                        onMenuItemClick(item.id);
                        if (isMobile) setIsMenuOpen(false);
                      }}
                    >
                      <span className="flex-grow">{item.label}</span>
                      {activeMenu === item.id && <ChevronRight size={16} className="text-blue-500" />}
                    </li>
                  ))}
                </ul>
                {index < menuItems.length - 1 && <Divider className="my-3" />}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}