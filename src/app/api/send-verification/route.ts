import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// В реальном приложении эти данные должны храниться в переменных окружения
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email не указан' },
        { status: 400 }
      );
    }

    // Генерация 6-значного кода
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Отправка email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Подтверждение email в AsNodt Storage',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0ea5e9;">Подтверждение email</h1>
          <p>Ваш код подтверждения: <strong style="font-size: 24px; color: #0ea5e9;">${verificationCode}</strong></p>
          <p>Этот код действителен в течение 10 минут.</p>
          <p>Если вы не запрашивали этот код, проигнорируйте это письмо.</p>
        </div>
      `,
    });

    // В реальном приложении здесь нужно сохранить код в базе данных
    // с временем его действия и привязать к email пользователя

    return NextResponse.json(
      { message: 'Код подтверждения отправлен' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending verification code:', error);
    return NextResponse.json(
      { error: 'Ошибка при отправке кода подтверждения' },
      { status: 500 }
    );
  }
} 