'use client';
import {  useEffect, useState } from 'react'
import { Checkbox, CheckboxGroup } from "@heroui/react";
import { ITagResponse } from '@/types/tag.types';

export function TagPanel({ tagsList, selectedTags: initialSelectedTags, onTagsChange }: { 
    tagsList: ITagResponse[], 
    selectedTags?: ITagResponse[], 
    onTagsChange: (selectedTags: ITagResponse[]) => void 
  }) {
    const [selectedTags, setSelectedTags] = useState(initialSelectedTags || [] as ITagResponse[]);

    useEffect(() => {
      if (initialSelectedTags) {
        setSelectedTags(initialSelectedTags);
      }
    }, [initialSelectedTags, setSelectedTags]);

    const handleRolesChange = (selectedTagIds: string[]) => {
        const selectedTags = tagsList.filter(tag => selectedTagIds.includes(tag.id));
        setSelectedTags(selectedTags);
        onTagsChange(selectedTags);
    };

    return (
        <div >
            <CheckboxGroup
                name='roles'
                value={selectedTags.map(tag => tag.id)}
                onChange={handleRolesChange}
                orientation="horizontal"
                label="Теги"
            >
                {tagsList.map((tag, index) => (
                        <Checkbox
                            key={tag.id}
                            value={tag.id}
                            color="primary"
                        >
                            <span className="">{tag.name}</span>
                        </Checkbox>
                ))}
            </CheckboxGroup>
        </div>
    );
}