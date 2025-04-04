'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/PageWrapper';
import VerificationCode from '@/components/VerificationCode';

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'verification'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      // Отправка кода подтверждения
      const response = await fetch('/api/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке кода подтверждения');
      }

      setStep('verification');
    } catch (error) {
      setError('Произошла ошибка. Пожалуйста, попробуйте позже.');
    }
  };

  const handleVerificationComplete = async (code: string) => {
    try {
      // Проверка кода и регистрация пользователя
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          verificationCode: code,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при регистрации');
      }

      router.push('/login');
    } catch (error) {
      setError('Неверный код подтверждения');
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await fetch('/api/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке кода подтверждения');
      }
    } catch (error) {
      setError('Произошла ошибка. Пожалуйста, попробуйте позже.');
    }
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
          {step === 'form' ? (
            <>
              <h1 className="text-3xl font-bold text-center mb-8 text-primary-600 dark:text-primary-400">
                Регистрация в AsNodt Storage
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input-field dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

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

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Подтвердите пароль
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="input-field dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full btn-primary"
                >
                  Зарегистрироваться
                </motion.button>
              </form>
            </>
          ) : (
            <VerificationCode
              email={formData.email}
              onComplete={handleVerificationComplete}
              onResend={handleResendCode}
            />
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Уже есть аккаунт?{' '}
              <Link href="/login" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                Войти
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </PageWrapper>
  );
} 