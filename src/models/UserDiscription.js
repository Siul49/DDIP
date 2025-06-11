import mongoose from 'mongoose';

const userDescriptionSchema = new mongoose.Schema({
    
    description: {type: String, required: true},
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// 연결된 DB가
const User = mongoose.models.user || mongoose.model('UserDescription', userDiscriptionSchema);

export default User;

