import Link from 'next/link'

interface Crumb {
    name?: string
    url?: string
    active: boolean
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
    return (
        <>
            <div  className="flex flex-row justify-start gap-4">
                {crumbs.map((crumb, index) => {
                    const textColor = crumb.active ? 'font-bold' : ''
                    return (
                        <Link key={index} href={crumb?.url || '/'}>
                            <div className={`text-[22px] lg:text-[28px] text-black ${textColor}`}>
                                {crumb.name}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}