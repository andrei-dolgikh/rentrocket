
import type { Metadata } from 'next'
import React from 'react';
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
    title: 'Information',
    ...NO_INDEX_PAGE
}

export default function InfoPage() {
    return (
        <div className='text-black'>
            Разделы системы управления квартирами
            Ключевой элемент сайта - раздел "Управление квартирой". Он создаёт общее информационное пространство между всеми собственниками, доверенными лицами и арендаторами квартиры (или любого другого объекта недвижимости). Раздел "Управление квартирой" состоит из 16 веб-форм, сгруппированных в 3 смысловых блока. Итак:


        </div>
    )
}


