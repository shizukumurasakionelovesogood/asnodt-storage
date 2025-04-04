# AsNodt Storage

Современное облачное хранилище файлов с поддержкой публичного и приватного доступа.

## Технологии

- Next.js 14
- TypeScript
- Tailwind CSS
- MongoDB Atlas
- NextAuth.js
- Framer Motion

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/asnodt-storage.git
cd asnodt-storage
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env.local` в корне проекта и добавьте необходимые переменные окружения:
```env
MONGODB_URI=your_mongodb_atlas_uri
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Запустите проект в режиме разработки:
```bash
npm run dev
```

5. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Развертывание

Проект настроен для развертывания на [Render.com](https://render.com). Для развертывания:

1. Создайте новый Web Service на Render
2. Подключите ваш GitHub репозиторий
3. Настройте переменные окружения в настройках сервиса
4. Render автоматически развернет ваше приложение

## Функциональность

- Публичное и приватное облачное хранилище
- Аутентификация пользователей
- Темная/светлая тема
- Адаптивный дизайн
- Анимации и современный UI 