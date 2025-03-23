'use client'
import { Button } from "@heroui/button";
import { useUpdateFlat } from '../../../admin/flats/hooks/useUpdateFlat'
import { Input, Textarea } from "@heroui/input";
import { Breadcrumbs } from '@/components/ui/breadcrumbs/Breadcrumbs'
import { useState, useRef, FormEvent, useEffect } from 'react'
import { useFlat } from '../../../admin/flats/hooks/useFlat'
import { TagPanel } from '@/components/ui/tag/TagPanel'
import { useTags } from '../../../admin/tags/hooks/useTags'
import { ITag } from '@/types/tag.types'
import { IFlatUpdateRequest } from '@/types/flat.types'
import { Checkbox, CheckboxGroup, Card, CardBody } from "@heroui/react"
import Loader from '@/components/ui/Loader'
import { FlatImageUploader } from '@/components/ui/flat/FlatImageUploader'




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
		recommended: flat?.recommended,
		tags: flat?.tags,
		iconUrl: flat?.iconUrl,
		price: flat?.price

	});

	useEffect(() => {
		if (flat && isFlatSuccess) {
			setFormData({
				name: flat?.name,
				order: flat?.order,
				description: flat?.description,
				recommended: flat?.recommended,
				tags: flat?.tags,
				price: flat?.price,
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
			recommended: formData.recommended,
			tags: formData?.tags as ITag[],
			iconUrl: formData?.iconUrl,
			price: formData.price
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
					<Button type='submit' color="primary" className='text-[12px] ' isDisabled={formDisabled}>Сохранить материал</Button>
				</div>
				<div className='flex flex-col'>
					<div className='flex flex-row justify-start gap-4'>
						<Input
							id='name'
							className='w-[90%] xl:w-[389px]'
							label="Название"
							value={formData.name}
							onChange={(e) => handleFormChange({ ...formData, name: e.target.value })}
							name='name' />
						<TagPanel
							selectedTags={flat?.tags}
							onTagsChange={(selectedTags) => handleFormChange({ ...formData, tags: selectedTags })}
							tagsList={tags} />
					</div>


					<Textarea
						label="Описание:"
						value={formData.description}
						onChange={(e) => handleFormChange({ ...formData, description: e.target.value })}
						className="w-[90%] xl:w-[769px] my-5"
						name='description'
					/>
                    <Input
                        id='name'
                        className='w-[90%] xl:w-[389px]'
                        label="Стоимость"
                        value={formData.price?.toString()}
                        onChange={(e) => handleFormChange({ ...formData, price: +e.target.value })}
                        name='price' />
					<CheckboxGroup
						name='recommended'
						orientation="horizontal"
						className='ml-2 mt-2'
						value={formData.recommended ? ["recommended"] : []}
						onChange={(values) => handleFormChange({ ...formData, recommended: values.includes("recommended") })}
					>
						<Checkbox
							key={"recommended"}
							value="recommended"
							color="success"
						>
							<span className="">Доступна для аренды</span>
						</Checkbox>
					</CheckboxGroup>

					<div className='flex flex-col xl:flex-row justify-evenly xl:justify-start my-5 '>
						<FlatImageUploader
							flatId={flatId}
							image={formData.iconUrl}
							setImage={(image) => handleFormChange({ ...formData, iconUrl: image })}
						/>
					</div>
				</div>
			</form>
		</div>
	)
}