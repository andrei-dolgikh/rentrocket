import { IComment } from '@/types/comments.types'
import { IResourceResponse } from '@/types/flat.types';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Link from 'next/link';
import DOMPurify from 'dompurify';
// import { X, Check } from 'lucide-react';
// import { Button, Spinner } from "@nextui-org/react";
// import { useApproveComment } from '@/app/admin/moderation/hooks/useApproveComment';
// import { useDeclineComment } from '@/app/admin/moderation/hooks/useDeclineComment';
import { format } from 'date-fns';
import { Checkbox } from '@nextui-org/react'
import { Eye, MessageCircle } from 'lucide-react';

function getFormattedDate(date?: any) {
    if (!date) return ''
    return format(new Date(date), 'dd/MM/yy HH:mm');
}


export function AdminAnnounce({ resource,
    showCheckbox,
    onCheckboxChange }: { resource: IResourceResponse,
        showCheckbox?: boolean,            
        onCheckboxChange?: (id: string, checked: boolean) => void
    }) {
        const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (onCheckboxChange) {
              onCheckboxChange(resource.id, event.target.checked);
            }
          }
    // const { approveComment, isApprovePending, isApproveSuccess } = useApproveComment();
    // const { declineComment, isDeclinePending, isDeclineSuccess } = useDeclineComment();

    return (
        <Link href={`/admin/resources/categories/${resource?.resourceCategory?.id}/${resource?.id}`}>
            <Card className='p-2'>
                <CardBody>
                    <div className='flex flex-row justify-between items-center '>
                        <div className='w-[90%] flex flex-col'>
                            <div>
                                <span className='text-[20px]'>{resource?.name}</span>
                                <span className='text-brandGrayLight text-[12px] ml-2'>
                                    {getFormattedDate(resource?.createdAt)}
                                </span>
                            </div>
                            <div className='text-brandGrayLight'>{DOMPurify.sanitize(resource?.description || '', { ALLOWED_TAGS: [] })}</div>
                        </div>
                        <div className='w-[10%] flex flex-col gap-2 text-brandGrayLight'>
                            <div className='flex flex-row gap-2'><Eye /> {resource?.viewsCount}</div>
                            <div className='flex flex-row gap-2'><MessageCircle />{resource?.commentsCount}</div>
                        </div>
                        {showCheckbox && <Checkbox onChange={handleCheckboxChange} />}
                    </div>
                </CardBody>
            </Card>
        </Link>
    );
}