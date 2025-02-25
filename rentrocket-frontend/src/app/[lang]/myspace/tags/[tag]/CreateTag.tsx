'use client';
import { FormEvent } from 'react'
import { Checkbox, CheckboxGroup, Input } from '@nextui-org/react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs/Breadcrumbs';
import { Button } from '@/components/ui/buttons/Button';
import { TypeTagForm } from '@/types/tag.types';
import { useCreateTag } from '../hooks/useCreateTag';

export function CreateTag() {
    const { createTag, isCreatePending } = useCreateTag();

    async function onCreateSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    
        const formData = new FormData(event.currentTarget)

        const tagData: TypeTagForm = {
            name: formData.get('name') as string,
            order: 0
        }

        createTag(tagData)
        
    }

    const crumbs = [
        { active: false, name: 'Теги', url: '/admin/tags' }, 
        { active: true, name: "Создание тега", url: '' }
    ];

    return (
        <div>
            <div className="flex justify-between">
                <Breadcrumbs crumbs={crumbs} />
            </div>
            <form onSubmit={onCreateSubmit}>
                <div className="flex flex-col">
                <div className="mb-4 flex flex-row justify-between"></div>
                    <div className="flex flex-col">
                        <Input
                            id="name"
                            className="mb-4"
                            label="Название тега"
                            name='name'
                        />
                    </div>
                    <Button type="submit">Создать тег</Button>
                </div>
            </form>
        </div>
    );
}