import { MainPage } from "./MainPage";

export function MainLayout({ dictionary, lang }: { dictionary: Record<string, any> , lang: string}) {
    return (
        <>
            <MainPage dictionary={dictionary} lang={lang} />
        </>
    )
}