import mongoose from 'mongoose';

const VerificationCodeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // Документ будет автоматически удален через 10 минут
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.VerificationCode || mongoose.model('VerificationCode', VerificationCodeSchema); 