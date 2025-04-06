import { MainBanner } from "./MainBanner";

export function MainLayout({ dictionary }: { dictionary: Record<string, any> }) {
    return (
        <>
            <MainBanner dictionary={dictionary} />
        </>
    )
}