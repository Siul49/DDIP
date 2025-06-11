import mongoose from 'mongoose';

const ChatRoomSchema = new mongoose.Schema({
    roomId: String,
    participants: [String] // 유저 ID 배열
});

export default mongoose.models.ChatRoom || mongoose.model('ChatRoom', ChatRoomSchema, 'chatroom');