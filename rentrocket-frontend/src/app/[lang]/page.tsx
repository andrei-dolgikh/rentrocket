import { MainLayout } from '@/components/ui/main/MainLayout';
import { getDictionary } from './dictionaries';

export default async function Home({ 
  params 
}: { 
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dictionary = await getDictionary(lang as "en" | "ru");

  return (
    <>
      <MainLayout dictionary={dictionary} />
    </>
  )
}