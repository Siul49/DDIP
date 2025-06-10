import Image from "next/image";

export default function ChatMessage({ chatId, name, lastUser, lastMessage, time, profileImg, onClick }) {
    return (
        <div onClick={onClick}
             className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer">
            {/* 프로필 이미지 */}
            <div className="w-[40px] h-[40px] relative rounded-full overflow-hidden mr-3">
                <Image src={profileImg || "/default-profile.png"} alt="profile" fill />
            </div>

            {/* 채팅 내용 */}
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-[16px]">{name}</p>
                    <span className="text-[10px] text-regular text-[#D0D0D0]">{time}</span>
                </div>
                <p className="text-[14px] text-left ml-[2px]  text-[#909090] truncate">{lastUser}: {lastMessage}</p>
            </div>

        </div>
    );
}
