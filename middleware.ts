import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Список поддерживаемых локалей
  locales: ['en', 'ru', 'uk', 'cs'],

  // Локаль по умолчанию
  defaultLocale: 'en'
});

export const config = {
  // Пути, которые должны обрабатываться middleware
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 