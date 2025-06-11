// lib/getRoomParticipants.js
import ChatRoom from '../models/ChatRoom';

export async function getRoomParticipants(roomId) {
    const room = await ChatRoom.findOne({ roomId });
    if (!room) return 0;
    return room.participants.length;
}
