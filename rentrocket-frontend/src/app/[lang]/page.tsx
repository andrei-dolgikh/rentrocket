import { MainLayout } from '@/components/ui/main/MainLayout';
import { getDictionary } from './dictionaries';

export default async function Home({ 
  params 
}: { 
  params: Promise<{ lang: string }> | { lang: string }
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  const dictionary = await getDictionary(lang as "en" | "ru");

  return (
    <>
      <MainLayout dictionary={dictionary} />
    </>
  )
}