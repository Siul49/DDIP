import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

// 연결된 DB가 'user' 데이터베이스라고 가정
const User = mongoose.models.User || mongoose.model('user', userSchema, 'account');

export default User;
