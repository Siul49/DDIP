import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

// 연결된 DB가
const User = mongoose.models.user || mongoose.model('user', userSchema, 'account');

export default User;

