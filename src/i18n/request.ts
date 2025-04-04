import { getRequestConfig, requestLocale } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = await requestLocale();
  setRequestLocale(locale);
  
  return {
    messages: (await import(`@/messages/${locale}.json`)).default
  };
}); 