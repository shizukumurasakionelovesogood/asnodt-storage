'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VerificationCodeProps {
  email: string;
  onComplete: (code: string) => void;
  onResend: () => void;
}

export default function VerificationCode({ email, onComplete, onResend }: VerificationCodeProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Автоматический переход к следующему полю
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=code-${index + 1}]`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=code-${index - 1}]`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      onComplete(fullCode);
    }
  };

  const handleResend = () => {
    if (canResend) {
      onResend();
      setTimeLeft(60);
      setCanResend(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-primary-600 dark:text-primary-400">
        Подтверждение email
      </h2>
      
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Мы отправили код подтверждения на {email}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-2">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              name={`code-${index}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2xl border-2 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
              required
            />
          ))}
        </div>

        <div className="text-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Отправить код повторно
            </button>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Повторная отправка через {timeLeft} сек
            </p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full btn-primary"
          disabled={code.join('').length !== 6}
        >
          Подтвердить
        </motion.button>
      </form>
    </motion.div>
  );
} 