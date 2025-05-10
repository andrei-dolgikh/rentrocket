import { Avatar, Link } from "@heroui/react";
import { getRandomColor } from "@/utils/utils";

export function UserBadge({ subject }: { subject: any }) {
    return (
        <div >
            {subject.login ? (
                <div className="flex flex-row items-center gap-3">
                    <Avatar
                        name={subject.name}
                        color={getRandomColor(subject.id)}
                        size="sm" 
                        className="flex-shrink-0 w-8 h-8" 
                    />
                    <div>
                        <p className="font-semibold">{subject.name}</p>
                        <Link  href={`/profile/${subject.login}`} size="sm">
                            @{subject.login}
                        </Link>
                    </div>
                </div>
            ) : (
                <span className="text-[#999999]">Пользователь не найден</span>
            )}
        </div>
    )

}