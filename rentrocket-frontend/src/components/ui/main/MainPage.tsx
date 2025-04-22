'use client'
import { Button, Card, CardBody, Divider } from "@heroui/react";
import Link from 'next/link';
import { useAuth } from '../../../app/[lang]/authContext';
import { createLocalizedUrl } from '../../../utils/utils';

export function MainPage({
  dictionary,
  lang
}: {
  dictionary: Record<string, any>,
  lang: string
}) {

  const { isAuthenticated, profile, isProfileLoading } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/pattern.svg')",
            backgroundSize: "cover"
          }}>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Hero Content */}
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {dictionary.main.title || "Rent Rocket"}
              </h1>

              <p className="text-xl md:text-2xl mb-4 opacity-90">
                {dictionary.main.mainText1}
              </p>

              <p className="text-lg md:text-xl mb-8 opacity-80">
                {dictionary.main.mainText2}
              </p>

              <div className="flex flex-wrap gap-4">

                <Button
                  as={Link}
                  href={createLocalizedUrl(lang, '/help')}
                  color="default"
                  variant="ghost"
                  size="lg"
                  radius="full"
                  className="text-white border-white font-medium"
                >
                  {dictionary.main.learnMore || "Узнать больше"}
                </Button>
              </div>
            </div>

            {/* Auth Card */}
			{(!isAuthenticated || isProfileLoading) && (
            <div className="md:w-5/12">
              <Card className="shadow-xl bg-white/95 backdrop-blur-sm">
                <CardBody className="px-6 py-8">
                  <h2 className="text-2xl font-bold text-center mb-6">
                    {dictionary.auth.welcome || "Добро пожаловать"}
                  </h2>

                  <p className="text-center text-gray-600 mb-8">
                    {dictionary.auth.getStarted || "Войдите или зарегистрируйтесь, чтобы начать"}
                  </p>

                  <div className="flex flex-col gap-3">
                    <Button
                      as={Link}
                      href={createLocalizedUrl(lang, '/auth')}
                      color="primary"
                      radius="sm"
                      size="lg"
                      className="w-full font-medium"
                    >
                      {dictionary.auth.login || "Войти"}
                    </Button>

                    <div className="relative flex items-center py-3">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="flex-shrink mx-3 text-gray-500 text-sm">
                        {dictionary.auth.or || "или"}
                      </span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <Button
                      as={Link}
                      href={createLocalizedUrl(lang, '/register')}
                      color="secondary"
                      variant="flat"
                      radius="sm"
                      size="lg"
                      className="w-full font-medium"
                    >
                      {dictionary.auth.register || "Зарегистрироваться"}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
      )}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
            <path fill="#ffffff" fillOpacity="1" d="M0,128L80,117.3C160,107,320,85,480,90.7C640,96,800,128,960,128C1120,128,1280,96,1360,80L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="container text-black mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {dictionary.main.features || "Наши преимущества"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-search text-blue-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {dictionary.main.feature1Title}
            </h3>
            <p className="text-gray-600">
              {dictionary.main.feature1Text}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-shield-alt text-purple-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {dictionary.main.feature2Title}
            </h3>
            <p className="text-gray-600">
              {dictionary.main.feature2Text}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-home text-green-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {dictionary.main.feature3Title }
            </h3>
            <p className="text-gray-600">
              {dictionary.main.feature3Text}
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 py-16 text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dictionary.main.faq || "Часто задаваемые вопросы"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">
                {dictionary.main.faq1Question || "Как зарегистрироваться на платформе?"}
              </h3>
              <p className="text-gray-600">
                {dictionary.main.faq1Answer || "Регистрация на нашей платформе проста и занимает всего несколько минут. Нажмите кнопку 'Зарегистрироваться', заполните необходимые поля и подтвердите свой email."}
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">
                {dictionary.main.faq2Question || "Как найти квартиру по моим критериям?"}
              </h3>
              <p className="text-gray-600">
                {dictionary.main.faq2Answer || "Используйте наши расширенные фильтры поиска, чтобы указать желаемый район, бюджет, количество комнат и другие параметры. Система автоматически подберет подходящие варианты."}
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">
                {dictionary.main.faq3Question || "Безопасно ли бронировать жильё через вашу платформу?"}
              </h3>
              <p className="text-gray-600">
                {dictionary.main.faq3Answer || "Да, мы обеспечиваем безопасные транзакции и проверяем всех арендодателей. Кроме того, мы предлагаем стандартизированные договоры аренды для защиты обеих сторон."}
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">
                {dictionary.main.faq4Question || "Могу ли я разместить свою квартиру для сдачи в аренду?"}
              </h3>
              <p className="text-gray-600">
                {dictionary.main.faq4Answer || "Конечно! Зарегистрируйтесь как арендодатель, добавьте информацию о вашей недвижимости с фотографиями и описанием, и ваше объявление будет доступно потенциальным арендаторам."}
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button
              as={Link}
              href={createLocalizedUrl(lang, '/faq')}
              color="primary"
              variant="light"
              size="lg"
              className="font-medium"
            >
              {dictionary.main.viewAllFaq || "Смотреть все вопросы"}
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}