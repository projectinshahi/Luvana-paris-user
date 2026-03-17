"use client";

import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';
   const textDir = isRTL ? "rtl" : "ltr";

  return (
    // <footer className="w-full bg-[#0a0a0a] text-white">
    <footer
  className="w-full bg-[#0a0a0a] text-white"
  // dir={isRTL ? "rtl" : "ltr"}
>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left`}>
          {/* Company Info */}
          <div className={isRTL ? "text-right" : "text-left"}>
            <h3 className={`text-2xl font-bold text-[#C9A24D] mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.companyName')}
            </h3>
            <p className={`text-gray-400 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.description')}
            </p>
            <div className="space-y-3">
              <div className={`flex items-center gap-3 text-gray-400 hover:text-[#C9A24D] transition `}>
                <Mail size={18} />
                <span>{t('footer.email')}</span>
              </div>
              <div className={`flex items-center gap-3 text-gray-400 hover:text-[#C9A24D] transition`}>
                <Phone size={18} />
                <span>{t('footer.phone')}</span>
              </div>
              <div className={`flex items-center gap-3 text-gray-400 hover:text-[#C9A24D] transition`}>
                <MapPin size={18} />
                <span>{t('footer.address')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={isRTL ? "text-right" : "text-left"}>
            <h4 className={`text-lg font-bold text-white mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-gray-400 hover:text-[#C9A24D] transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-400 hover:text-[#C9A24D] transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('shop')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-400 hover:text-[#C9A24D] transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('categories.brands')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-400 hover:text-[#C9A24D] transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.blog')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-400 hover:text-[#C9A24D] transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className={isRTL ? "text-right" : "text-left"}>
            <h4 className={`text-lg font-bold text-white mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.customerCare')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-gray-400 hover:text-[#C9A24D] transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.shippingInfo')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-400 hover:text-[#C9A24D] transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.returns')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-400 hover:text-[#C9A24D] transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.faq')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-400 hover:text-[#C9A24D] transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.trackOrder')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-400 hover:text-[#C9A24D] transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.support')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className={isRTL ? "text-right" : "text-left"}>
            <h4 className={`text-lg font-bold text-white mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.followUs')}
            </h4>
            <div className={`flex gap-4 mb-6`}>
              <a
                href="#"
                className="bg-[#1a1a1a] p-3 rounded-full hover:bg-[#C9A24D] transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-[#1a1a1a] p-3 rounded-full hover:bg-[#C9A24D] transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-[#1a1a1a] p-3 rounded-full hover:bg-[#C9A24D] transition"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-[#1a1a1a] p-3 rounded-full hover:bg-[#C9A24D] transition"
              >
                <Linkedin size={20} />
              </a>
            </div>

            {/* Payment Methods */}
            <div>
              <p className={`text-sm font-semibold text-gray-400 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.weAccept')}
              </p>
              <div className={`flex flex-wrap gap-2`}>
                <span className="bg-[#1a1a1a] px-3 py-1 rounded text-xs text-gray-400">
                  {t('footer.visa')}
                </span>
                <span className="bg-[#1a1a1a] px-3 py-1 rounded text-xs text-gray-400">
                  {t('footer.mastercard')}
                </span>
                <span className="bg-[#1a1a1a] px-3 py-1 rounded text-xs text-gray-400">
                  {t('footer.upi')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8">
          {/* <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left ${isRTL ? 'md:text-right' : ''}`}> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-start">
            <p className={`text-gray-400 text-sm ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.allRightsReserved')}
            </p>
            <div className={`flex flex-col md:flex-row gap-4 justify-center ${isRTL ? 'md:justify-start' : 'md:justify-end'}`}>
              <a href="#" className={`text-gray-400 hover:text-[#C9A24D] text-sm transition ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.privacyPolicy')}
              </a>
              <a href="#" className={`text-gray-400 hover:text-[#C9A24D] text-sm transition ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.termsOfService')}
              </a>
              <a href="#" className={`text-gray-400 hover:text-[#C9A24D] text-sm transition ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.cookieSettings')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
