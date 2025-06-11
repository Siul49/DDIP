// models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    roomId: String,
    senderId: String,
    senderName: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
