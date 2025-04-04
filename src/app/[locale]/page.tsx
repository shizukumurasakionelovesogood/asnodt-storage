'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';
import ParticleNetwork from '@/components/ParticleNetwork';

export default function Home() {
  const t = useTranslations('auth');

  return (
    <PageWrapper>
      <main className="min-h-screen bg-gradient-to-b from-white/80 to-gray-100/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
        <ParticleNetwork />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center space-y-8 p-8"
        >
          <h1 className="text-5xl font-bold text-primary-600 dark:text-primary-400">
            AsNodt Storage
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Безопасное облачное хранилище с подтверждением email
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                {t('login')}
              </motion.button>
            </Link>
            
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                {t('register')}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </main>
    </PageWrapper>
  );
} 