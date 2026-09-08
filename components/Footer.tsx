"use client";

import Link from "next/link";
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 gap-y-10 mb-10 md:mb-12 text-center md:text-left`}>
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <Image
              src="/images/final.png"
              alt="Luvana Paris"
              width={100}
              height={111}
              className="h-14 w-auto object-contain mb-4 mx-auto md:mx-0"
            />
            <p className={`text-muted mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.description')}
            </p>
            <div className="space-y-3 [&>div]:justify-center md:[&>div]:justify-start">
              <a href={`mailto:${t('footer.email')}`} className="flex items-center gap-3 text-ink-soft hover:text-gold-dark transition">
                <Mail size={18} />
                <span>{t('footer.email')}</span>
              </a>
              <a href={`tel:${t('footer.phone')}`} className="flex items-center gap-3 text-ink-soft hover:text-gold-dark transition">
                <Phone size={18} />
                <span>{t('footer.phone')}</span>
              </a>
              <div className="flex items-center gap-3 text-ink-soft transition">
                <MapPin size={18} />
                <span>{t('footer.address')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className={`text-lg font-bold text-ink mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/brands" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('shop')}
                </Link>
              </li>
              <li>
                <Link href="/brands" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('categories.brands')}
                </Link>
              </li>
              {/* <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.blog')}
                </a>
              </li> */}
              {/* <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('contact')}
                </a>
              </li> */}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="text-center md:text-left">
            <h4 className={`text-lg font-bold text-ink mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.customerCare')}
            </h4>
            <ul className="space-y-2">
              {/* <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.shippingInfo')}
                </a>
              </li> */}
              <li>
                <Link href="/returns" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link href="/myorders" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.trackOrder')}
                </Link>
              </li>
              {/* <li>
                <a href="#" className={`text-ink-soft hover:text-gold-dark transition ${isRTL ? 'font-arabic' : ''}`}>
                  {t('footer.support')}
                </a>
              </li> */}
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <h4 className={`text-lg font-bold text-ink mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.followUs')}
            </h4>
            <div className={`flex gap-4 mb-6 justify-center md:justify-start`}>
              <a
                href="#"
                aria-label="Facebook"
                className="bg-card border border-line p-3 rounded-full text-ink-soft hover:bg-gold hover:text-cream hover:border-gold hover:-translate-y-0.5 transition-all duration-300"
              >
                <Facebook size={20} aria-hidden />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="bg-card border border-line p-3 rounded-full text-ink-soft hover:bg-gold hover:text-cream hover:border-gold hover:-translate-y-0.5 transition-all duration-300"
              >
                <Instagram size={20} aria-hidden />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="bg-card border border-line p-3 rounded-full text-ink-soft hover:bg-gold hover:text-cream hover:border-gold hover:-translate-y-0.5 transition-all duration-300"
              >
                <Twitter size={20} aria-hidden />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="bg-card border border-line p-3 rounded-full text-ink-soft hover:bg-gold hover:text-cream hover:border-gold hover:-translate-y-0.5 transition-all duration-300"
              >
                <Linkedin size={20} aria-hidden />
              </a>
            </div>

            {/* Payment Methods */}
            {/* <div>
              <p className={`text-sm font-semibold text-muted mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.weAccept')}
              </p>
              <div className={`flex flex-wrap gap-2 justify-center md:justify-start`}>
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
            </div> */}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-line py-6 md:py-8">
          {/* <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left ${isRTL ? 'md:text-right' : ''}`}> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
            <p className={`text-muted text-sm ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.allRightsReserved')}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-end">
              <Link href="/privacy" className={`text-ink-soft hover:text-gold-dark text-sm transition ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.privacyPolicy')}
              </Link>
              <Link href="/terms" className={`text-ink-soft hover:text-gold-dark text-sm transition ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.termsOfService')}
              </Link>
              <Link href="/shipping" className={`text-ink-soft hover:text-gold-dark text-sm transition ${isRTL ? 'font-arabic' : ''}`}>
                {t('footer.cookieSettings')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
