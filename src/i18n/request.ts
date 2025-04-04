import { getRequestConfig } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';

export default getRequestConfig(async ({ locale }) => {
  setRequestLocale(locale);
  
  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
    timeZone: 'Europe/Moscow',
    now: new Date(),
    defaultTranslationValues: {
      strong: (chunks: ReactNode) => chunks
    }
  };
}); 