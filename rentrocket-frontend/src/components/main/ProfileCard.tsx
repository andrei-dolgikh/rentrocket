'use client'
import { Card, CardBody, CardHeader, Avatar, Badge, Button } from '@heroui/react';
import { useLanguage } from '../../app/[lang]/languageContext';
import { useAuth } from '../../app/[lang]/authContext';
import { Mail, User, Edit, Phone, Calendar } from 'lucide-react';
import { URLS_PAGES } from '@/config/pages-url.config'
import { createLocalizedUrl } from '../../utils/utils'
import Link from 'next/link';
import { InvitationsTable } from '@/components/table/InvitationsTable'

export function ProfileCard() {
    const { profile, isProfileLoading } = useAuth();
    const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();
    

    if (isProfileLoading || !profile) {
        return (
            <Card className="w-full max-w-md mx-auto shadow-lg overflow-hidden">
                <CardBody className="p-6 flex flex-col items-center space-y-4">
                    <div className="animate-pulse flex flex-col items-center w-full">
                        <div className="rounded-full bg-gray-300 h-24 w-24 mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
                        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                    </div>
                </CardBody>
            </Card>
        );
    }

    const initials = profile.user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

    const email = profile.user.email || profile.email || "Электронная почта не указана";
    
    return (
        <div className='flex flex-col gap-5'>
        <Card className="w-3/4 mx-auto shadow-lg overflow-hidden border-0">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            
            <div className="relative px-6">
                <div className="absolute -top-16 left-6">
                    <Avatar 
                        className="h-24 w-24 text-xl border-4 border-white bg-gradient-to-br from-indigo-500 to-purple-700 text-white"
                        name={initials}
                    />
                </div>
                
                <div className="pt-12 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">{profile.user.name}</h2>
                        <p className="text-gray-500">@{profile.user.login}</p>
                    </div>
                    <Link href={createLocalizedUrl(lang, URLS_PAGES.PROFILE_UPDATE)}>
                    <Button 
                        color="primary" 
                        variant="light" 
                        startContent={<Edit size={18} />}
                        className="rounded-full"
                    >
                        {dictionary?.profile?.edit || "Edit Profile"}
                    </Button>
                    </Link>
                </div>
            </div>
            
            <CardBody className="p-6">
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <Mail className="text-gray-400" size={20} />
                        <span>{email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <User className="text-gray-400" size={20} />
                        <span>{dictionary?.profile?.username || "Username"}: {profile.user.login}</span>
                    </div>
                    
                    {profile.user.primaryPhone && (
                        <div className="flex items-center space-x-3">
                            <Phone className="text-gray-400" size={20} />
                            <span>{profile.user.primaryPhone}</span>
                        </div>
                    )}
                    
                    {profile.user.createdAt && (
                        <div className="flex items-center space-x-3">
                            <Calendar className="text-gray-400" size={20} />
                            <span>
                                {dictionary?.profile?.joined || "Joined"}: {
                                    new Date(profile.user.createdAt).toLocaleDateString()
                                }
                            </span>
                        </div>
                    )}
                    
                    {/* <div className="flex justify-around pt-4 border-t mt-4">
                        <div className="text-center">
                            <div className="font-bold text-xl">{profile.user.rentCount || 0}</div>
                            <div className="text-sm text-gray-500">{dictionary?.profile?.rentCount || " квартир в аренде "}</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-xl">{profile.user.ownCount || 0}</div>
                            <div className="text-sm text-gray-500">{dictionary?.profile?.ownCount || " квартир в собственности"}</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-xl">{profile.user.manageCount || 0}</div>
                            <div className="text-sm text-gray-500">{dictionary?.profile?.manageCount || " квартир в управлении"}</div>
                        </div>
                    </div> */}
                </div>
            </CardBody>
        </Card>

        <Card className=" w-3/4 mx-auto shadow-lg overflow-hidden border-0">
            <div className='flex justify-between items-center mb-[10px]'>
              <div className='p-5'>
                Действия, ожидающие вашего внимания
              </div>
            </div>
        <InvitationsTable invitations={profile.user.receivedInvitations} actions={true}  />

        </Card>
        </div>
    );
}