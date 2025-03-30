'use client'
import { Card, CardBody, CardHeader, } from '@heroui/react';
import { useLanguage } from '../../../app/[lang]/languageContext';
import { useProfile } from '@/hooks/useProfile'
import { useContext } from 'react';
import { AuthContext } from '../../../app/[lang]/authContext';

export function ProfileCard() {
    const { isAuthenticated } = useContext(AuthContext);
    const { data: profile, isLoading: isProfileLoading, isSuccess: isProfileSuccess } = useProfile({ isAuthenticated: isAuthenticated });
    // data?.user.login
    // @{data?.user.name}
    const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
    return (
        isProfileLoading ? (<p>Загрузка...</p>) : <Card >
            <CardHeader>
                <h1>Профиль</h1>
            </CardHeader>
            <CardBody>
                <p>Логин: {profile?.user.login}</p>
                <p>Имя: {profile?.user.name}</p>
            </CardBody>

        </Card>

    )
}