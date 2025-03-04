'use client'
import { useTags } from './hooks/useTags'
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import Link from 'next/link'
import { GlobalLoader } from '@/components/header/GlobalLoader'
import { TagsTable } from '@/components/ui/table/TagsTable'
import { useState } from 'react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs/Breadcrumbs'
import { URLS_PAGES } from '@/config/pages-url.config';
import { useLanguage } from '../../languageContext';
import { createLocalizedUrl } from '../../../../utils/utils'


const useTagsData = (): { data: { name: string }[], isTagsLoading: boolean } => {
  const { tags, setTags, isTagsLoading } = useTags()
  const data: { id: string; name: string  }[] = [];

  tags.map((tag) => {
    data.push({
      id: tag.id,
      name: tag.name
    })
  })

  return { data, isTagsLoading }
}

const columns = [
  {
    key: "name",
    label: "Название тега",
  },
  {
    key: "tags:actions",
    label: "",
  }
];



export function Tags() {
  const { data, isTagsLoading } = useTagsData()
  const [searchInput, setSearchInput] = useState('');
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();

  const crumbs = [
    { active: false, name: "Квартиры", url: createLocalizedUrl(lang, URLS_PAGES.MYSPACE_FLATS) }, 
    { active: true, name: "Теги", url: createLocalizedUrl(lang, URLS_PAGES.MYSPACE_TAGS) },
  ]
  

  const filteredData = data.filter((tag) =>
    tag.name.toLowerCase().includes(searchInput.toLowerCase())
  );


  return isTagsLoading ? (
    <GlobalLoader />
  ) : (
    <div className='text-black'>
      <div className='flex justify-between items-center mt-3 mb-[10px]'>
      <Breadcrumbs crumbs={crumbs} />
      <span className='text-[#999999] text-[14px] ml-2 mr-2'>Всего {filteredData.length}</span>
        <div className='flex items-center gap-5'>
          <Link href={createLocalizedUrl(lang, '/admin/tags/create')}>
            <Button 
              color="primary"
              >
              Добавить тег
            </Button>
          </Link>
        <Input
        label="Поиск"
        placeholder="Название тега"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} />
        </div>

      </div>
      <TagsTable columns={columns} rows={filteredData} />
    </div>
  )
}
