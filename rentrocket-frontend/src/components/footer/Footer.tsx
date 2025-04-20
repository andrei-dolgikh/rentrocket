// 'use client'
import { Link } from "@heroui/react";
import { URLS_PAGES } from '@/config/pages-url.config'
import { createLocalizedUrl } from '../../utils/utils'
import { useLanguage } from '../../app/[lang]/languageContext';
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export function Footer({ lang, dictionary }: { lang: string; dictionary: Record<string, any> }) {
  // const { lang, dictionary }: { lang: string; dictionary: Record<string, any> } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold ">Rent-pult</h3>
            <p className="text-white text-sm">
              {dictionary.footer?.description || 'Modern solution for property management and rental services.'}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white hover:text-gray-600 transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-600 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-600 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-600 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{dictionary.footer?.resources || 'Resources'}</h4>
            <ul className="space-y-2">
              <li>
                <Link className="text-white hover:text-gray-600 transition-colors"
                  href={createLocalizedUrl(lang, URLS_PAGES.INFO)}>
                  {dictionary.header.about}
                </Link>
              </li>
              <li>
                <Link className="text-white hover:text-gray-600 transition-colors"
                  href={createLocalizedUrl(lang, URLS_PAGES.MYSPACE_TAGS)}>
                  {dictionary.header.DUmap}
                </Link>
              </li>
              <li>
                <Link className="text-white hover:text-gray-600 transition-colors"
                  href={createLocalizedUrl(lang, URLS_PAGES.AUTH)}>
                  {dictionary.header.dictionary}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{dictionary.footer?.legal || 'Legal'}</h4>
            <ul className="space-y-2">
              <li>
                <Link className="text-white hover:text-gray-600 transition-colors" href="#">
                  {dictionary.footer?.privacyPolicy || 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link className="text-white hover:text-gray-600 transition-colors" href="#">
                  {dictionary.footer?.termsOfService || 'Terms of Service'}
                </Link>
              </li>
              <li>
                <Link className="text-white hover:text-gray-600 transition-colors" href="#">
                  {dictionary.footer?.cookies || 'Cookies'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{dictionary.footer?.contact || 'Contact'}</h4>
            <address className="not-italic text-white">
              <p>Email: company@rent-pult.com</p>
              <p className="mt-2">
                Strasbourg, France
              </p>
            </address>
          </div>
        </div>

        <div className=" mt-5 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className=" text-sm">
              © 2022-{currentYear} Rent-pult
            </p>
            <div className="mt-4 flex items-center justify-center md:justify-end">
              <div className="text-xs text-gray-400 mr-2">Developed by</div>
              <div className="flex items-center bg-gradient-to-r from-gray-800 to-gray-700 px-3 py-1 rounded-full shadow-md">
                <a href="https://dev.lockshield.online"><span className="text-xs font-semibold text-gray-200 tracking-wide">LOCKSHIELD</span></a>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}