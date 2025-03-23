'use client';
import { FormEvent,useEffect,useState } from 'react'
import { useTag } from '../hooks/useTag';
import { Button } from '@/components/ui/buttons/Button';
import { Input } from "@heroui/react";
import { TypeTagForm } from '@/types/tag.types';
import { useUpdateTag } from '../hooks/useUpdateTag';
import { Breadcrumbs } from '@/components/ui/breadcrumbs/Breadcrumbs';
import { useLanguage } from '../../../languageContext';
import { createLocalizedUrl } from '../../../../../utils/utils'
import { URLS_PAGES } from '@/config/pages-url.config';


export function EditTag({ tag }: { tag: string }) {
	const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
  const { targetTag, isSuccess } = useTag({ id: tag });
  const returnUrl = createLocalizedUrl(lang, URLS_PAGES.MYSPACE_TAGS);
  const { isPending, updateTag } = useUpdateTag(returnUrl);
  const [formData, setFormData] = useState({
    name: targetTag?.name,
    order: 0
  });

  useEffect(() => {
    if (isSuccess && targetTag) {
      setFormData({
        name: targetTag.name,
        order: 0
      })
    }
  }, [isSuccess, targetTag])

  async function onEditSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      const userData: TypeTagForm = {
        name: formData.name,
      }
      updateTag({id: tag, data : userData})
      
  }
  const crumbs = [
    { active: false, name: 'Теги', url: '/admin/tags' }, 
    { active: true, name: targetTag?.name, url: '' }
  ];

  return (
    <div>
      <div className="flex justify-between">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <form className="" onSubmit={onEditSubmit}>
        <div className="flex flex-col">
          <div className="mb-4 flex flex-row justify-between"></div>

          <div className="flex flex-col">
            <Input
              id="name"
              className="mb-4"
              label="Название тега"
              name='name'
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              value={formData.name}
            />
          </div>

          <Button type="submit" disabled={isPending} state={isPending}>
            Сохранить тег
          </Button>
        </div>
      </form>
    </div>
  );
}