'use client'
import { Button } from "@nextui-org/button";
import { useUpdateFlat } from '../../../myspace/flats/hooks/useUpdateFlat'
import { Breadcrumbs } from '@/components/ui/breadcrumbs/Breadcrumbs'
import { useState, FormEvent, useEffect } from 'react'
import { useFlat } from '../../../myspace/flats/hooks/useFlat'
import { useTags } from '../../../myspace/tags/hooks/useTags'
import { ITag } from '@/types/tag.types'
import { IFlatUpdateRequest } from '@/types/flat.types'
import Loader from '@/components/ui/Loader'
import { FlatSettingsGeneralTab } from "@/components/ui/flat/FlatSettingsGeneralTab";
import { Tabs, Tab } from "@heroui/react";



export function UpdateFlat(
	{ flatId }:
		{ flatId: string }
) {

	const [formDisabled, setFormDisabled] = useState(true);
	const { updateFlat, isUpdatePending } = useUpdateFlat()
	const { flat, isFlatLoading, isFlatSuccess } = useFlat(flatId)
	const { tags, isTagsLoading } = useTags()

	const crumbs = [
		{ active: true, name: flat?.name, url: '/' }
	]

	const [formData, setFormData] = useState({
		name: flat?.name,
		order: flat?.order,
		description: flat?.description,
		tags: flat?.tags,
		iconUrl: flat?.iconUrl,

	});

	useEffect(() => {
		if (flat && isFlatSuccess) {
			setFormData({
				name: flat?.name,
				order: flat?.order,
				description: flat?.description,
				tags: flat?.tags,
				iconUrl: flat?.iconUrl
			})

		}
	}, [isFlatSuccess, flat])



	async function onUpdateSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const userData: IFlatUpdateRequest = {
			name: formData.name as string,
			order: formData.order,
			description: formData.description as string,
			tags: formData?.tags as ITag[],
			iconUrl: formData?.iconUrl,
		}

		updateFlat({ id: flatId, data: userData });
		setFormDisabled(true);
	};

	const handleFormChange = (data: any) => {
		setFormData({ ...formData, ...data })
		setFormDisabled(false);
	};

	return isFlatLoading && isTagsLoading ? (
		<Loader />
	) : (
		<div>
			<form
				className='mx-auto'
				onSubmit={onUpdateSubmit}
			>

				<div className='flex justify-between my-[30px]'>
					<Breadcrumbs crumbs={crumbs} />
					<Button type='submit' color="primary" className='text-[12px] ' isDisabled={formDisabled}>Сохранить квартиру</Button>
				</div>
				<Tabs aria-label="Dynamic tabs" >
					<Tab key={0} title={"Основные настройки"}>
						<FlatSettingsGeneralTab formData={formData} handleFormChange={handleFormChange} flat={flat} tags={tags} tabMode={"edit"} />
					</Tab>
					<Tab key={1} title={"Арендаторы"}>
					</Tab>
					<Tab key={2} title={"Фотографии"}>
					</Tab>
				</Tabs>
			</form>
		</div>
	)
}