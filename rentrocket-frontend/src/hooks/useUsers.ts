import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IUserResponse } from '@/types/user.types'
import { userService } from '@/services/user.service'

export function useUsers() {
    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => userService.getAll()
    })

    const [users, setUsers] = useState<IUserResponse[]>([]) // Initialize with an empty array

    useEffect(() => {
        if (data) {
            setUsers(data)
        }
    }, [data])

    return { users, setUsers, isLoading }
}


