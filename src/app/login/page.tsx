'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/PageWrapper';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login attempt:', formData);
  };

  return (
    <PageWrapper>
      <main className="min-h-screen bg-gradient-to-b from-white/80 to-gray-100/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg"
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-primary-600 dark:text-primary-400">
            Вход в AsNodt Storage
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input-field dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                className="input-field dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full btn-primary"
            >
              Войти
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Нет аккаунта?{' '}
              <Link href="/register" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </PageWrapper>
  );
} 