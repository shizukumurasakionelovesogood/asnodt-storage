import { getRequestConfig, requestLocale } from 'next-intl/server';
import { ReactNode } from 'react';

export default getRequestConfig(async () => {
  const locale = await requestLocale();
  
  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
    timeZone: 'Europe/Moscow',
    now: new Date(),
    defaultTranslationValues: {
      strong: (chunks: ReactNode) => chunks
    }
  };
}); 