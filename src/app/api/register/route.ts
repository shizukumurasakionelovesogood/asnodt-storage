import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import VerificationCode from '@/models/VerificationCode';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password, verificationCode } = await request.json();

    if (!name || !email || !password || !verificationCode) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Проверяем, существует ли пользователь
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    // Проверяем код подтверждения
    const verification = await VerificationCode.findOne({
      email,
      code: verificationCode,
      isUsed: false,
    });

    if (!verification) {
      return NextResponse.json(
        { error: 'Неверный или устаревший код подтверждения' },
        { status: 400 }
      );
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: true,
    });

    // Помечаем код как использованный
    await VerificationCode.findByIdAndUpdate(verification._id, { isUsed: true });

    return NextResponse.json(
      { message: 'Регистрация успешно завершена' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при регистрации' },
      { status: 500 }
    );
  }
} 