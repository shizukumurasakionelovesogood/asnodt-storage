'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FolderIcon, DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  isPublic: boolean;
}

export default function Storage() {
  const [activeTab, setActiveTab] = useState<'private' | 'public'>('private');
  const [files, setFiles] = useState<File[]>([
    {
      id: '1',
      name: 'Документы',
      type: 'folder',
      size: '-',
      date: '2024-02-20',
      isPublic: false,
    },
    {
      id: '2',
      name: 'Фотографии',
      type: 'folder',
      size: '-',
      date: '2024-02-20',
      isPublic: false,
    },
    {
      id: '3',
      name: 'Документ.docx',
      type: 'document',
      size: '2.5 MB',
      date: '2024-02-20',
      isPublic: false,
    },
    {
      id: '4',
      name: 'Публичный файл.pdf',
      type: 'document',
      size: '1.8 MB',
      date: '2024-02-20',
      isPublic: true,
    },
  ]);

  const filteredFiles = files.filter(file => 
    activeTab === 'private' ? !file.isPublic : file.isPublic
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h1 className="text-3xl font-bold mb-8 text-primary-600 dark:text-primary-400">
            {activeTab === 'private' ? 'Your AsNodt\'s Storage' : 'AsNodt Shadow Storage'}
          </h1>

          <div className="flex space-x-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('private')}
              className={`px-6 py-2 rounded-lg ${
                activeTab === 'private'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Приватное хранилище
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('public')}
              className={`px-6 py-2 rounded-lg ${
                activeTab === 'public'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Публичное хранилище
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  {file.type === 'folder' ? (
                    <FolderIcon className="h-8 w-8 text-yellow-500" />
                  ) : file.type === 'document' ? (
                    <DocumentIcon className="h-8 w-8 text-blue-500" />
                  ) : (
                    <PhotoIcon className="h-8 w-8 text-green-500" />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{file.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {file.size !== '-' ? file.size : 'Папка'} • {file.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 