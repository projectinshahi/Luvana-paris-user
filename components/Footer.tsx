"use client";

import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Footer() {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';

  return (
    <footer
      dir="ltr"
      className="w-full bg-champagne text-ink-soft border-t border-line"
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left`}>
          {/* Company Info */}
          <div className="text-left">
            <Image
              src="/images/final.png"
              alt="Luvana Paris"
              width={140}
              height={44}
              className="h-10 w-auto object-contain mb-4"
            />
            <p className={`text-muted mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.description')}
            </p>
            <div className="space-y-3">
              <div className={`flex items-center gap-3 text-ink-soft hover:text-gold-dark transition `}>
                <Mail size={18} />
                <span>{t('footer.email')}</span>
              </div>
              <div className={`flex items-center gap-3 text-ink-soft hover:text-gold-dark transition`}>
                <Phone size={18} />
                <span>{t('footer.phone')}</span>
              </div>
              <div className={`flex items-center gap-3 text-ink-soft hover:text-gold-dark transition`}>
                <MapPin size={18} />
                <span>{t('footer.address')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className={`text-lg font-bold text-ink mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('shop')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('categories.brands')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.blog')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="text-left">
            <h4 className={`text-lg font-bold text-ink mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.customerCare')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.shippingInfo')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.returns')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.faq')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.trackOrder')}
                </a>
              </li>
              <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.support')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-left">
            <h4 className={`text-lg font-bold text-ink mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.followUs')}
            </h4>
            <div className={`flex gap-4 mb-6`}>
              <a
                href="#"
                className="bg-card border border-line p-3 rounded-full text-ink-soft hover:bg-gold hover:text-cream hover:border-gold hover:-translate-y-0.5 transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-card border border-line p-3 rounded-full text-ink-soft hover:bg-gold hover:text-cream hover:border-gold hover:-translate-y-0.5 transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-card border border-line p-3 rounded-full text-ink-soft hover:bg-gold hover:text-cream hover:border-gold hover:-translate-y-0.5 transition-all duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-card border border-line p-3 rounded-full text-ink-soft hover:bg-gold hover:text-cream hover:border-gold hover:-translate-y-0.5 transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>

            {/* Payment Methods */}
            <div>
              <p className={`text-sm font-semibold text-muted mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.weAccept')}
              </p>
              <div className={`flex flex-wrap gap-2`}>
                <span className="bg-card border border-line px-3 py-1 rounded text-xs text-muted">
                  {t('footer.visa')}
                </span>
                <span className="bg-card border border-line px-3 py-1 rounded text-xs text-muted">
                  {t('footer.mastercard')}
                </span>
                <span className="bg-card border border-line px-3 py-1 rounded text-xs text-muted">
                  {t('footer.upi')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-line py-8">
          {/* <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left ${isRTL ? 'md:text-right' : ''}`}> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
            <p className={`text-muted text-sm ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.allRightsReserved')}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-end">
              <a href="#" className={`text-ink-soft hover:text-gold-dark text-sm transition ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.privacyPolicy')}
              </a>
              <a href="#" className={`text-ink-soft hover:text-gold-dark text-sm transition ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.termsOfService')}
              </a>
              <a href="#" className={`text-ink-soft hover:text-gold-dark text-sm transition ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.cookieSettings')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
