import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ITagResponse } from '@/types/tag.types'
import { tagService } from '@/services/tag.service'

export function useTags() {
    const { data, isLoading: isTagsLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: () => tagService.getAll()
    })

    const [tags, setTags] = useState<ITagResponse[]>([]) // Initialize with an empty array

    useEffect(() => {
        if (data) {
            setTags(data)
        }
    }, [data])

    return { tags, setTags, isTagsLoading }
}


