'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setDarkMode(!darkMode);
  };

  return (
    <PageWrapper>
      <main className="min-h-screen bg-gradient-to-b from-white/80 to-gray-100/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-8"
          >
            <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400">
              AsNodt Storage
            </h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold mb-4 dark:text-white">
              Ваше надежное облачное хранилище
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Безопасное хранение файлов с поддержкой публичного и приватного доступа.
              Простой и удобный интерфейс для управления вашими данными.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link href="/register" className="btn-primary">
              Регистрация
            </Link>
            <Link href="/login" className="btn-secondary">
              Вход
            </Link>
            <Link href="/login" className="btn-primary">
              Начать
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-600 dark:text-gray-300">
              Нет аккаунта?{' '}
              <Link href="/register" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                Зарегистрироваться
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
    </PageWrapper>
  );
} 