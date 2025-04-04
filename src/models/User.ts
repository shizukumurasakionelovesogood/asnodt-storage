import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя обязательно'],
  },
  email: {
    type: String,
    required: [true, 'Email обязателен'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Пожалуйста, введите корректный email'],
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен'],
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  files: [{
    name: String,
    type: String,
    size: Number,
    isPublic: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
});

export default mongoose.models.User || mongoose.model('User', UserSchema); 