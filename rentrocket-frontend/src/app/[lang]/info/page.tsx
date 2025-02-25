
import type { Metadata } from 'next'
import React from 'react';
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
    title: 'Information',
    ...NO_INDEX_PAGE
}

export default function InfoPage() {
    return (
        <div>
            <h1>Information</h1>
        </div>
    )
}


