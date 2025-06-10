import { useState } from "react";
import Image from "next/image";
import category_lists from "@constants/simpleDB";

export default function PostBox({ onClose }) {
    const [activeTags, setActiveTags] = useState([]);

    const handleClick = (value) => {
        setActiveTags((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    return (
        <div className="fixed bottom-[20px] right-[80px] w-[600px] h-[700px] bg-white
                        rounded-[20px] border-[2px] border-[#FEB162] z-100 flex flex-col">
            {/* 상단 */}
            <div className="flex items-center h-[50px] px-[15px] border-b-[2px] border-[#FEB162] gap-[10px]">
                <button onClick={onClose} className="w-[20px] h-[20px] relative">
                    <Image src="/chat-back.svg" fill alt="chat-back" />
                </button>
                <p className="text-[20px] font-semibold truncate">게시글</p>
            </div>

            {/* 제목 */}
            <div className="flex items-center h-[50px] px-[15px] border-b-[2px] border-[#FEB162] gap-[10px]">
                <label className="w-[10%] font-bold">제목:</label>
                <input type="text" className="w-[90%] h-[40px] border px-2 rounded" />
            </div>

            {/* 이미지 첨부 */}
            <div className="flex items-center h-[100px] px-[15px] border-b-[2px] border-[#FEB162] gap-[10px]">
                <label className="w-[20%] font-bold">이미지 첨부:</label>
                <div className="flex relative w-[80px] h-[80px] justify-center items-center border-2 rounded-2xl opacity-50">
                    <div className="relative w-[16px] h-[2px] bg-black" />
                    <div className="absolute w-[2px] h-[16px] bg-black" />
                    <input type="file" className="absolute w-full h-full opacity-0 cursor-pointer" />
                </div>
            </div>

            {/* 본문 입력 */}
            <div className="flex items-center justify-center h-[350px] px-[15px] border-b-[2px] border-[#FEB162] gap-[10px]">
                <textarea className="w-[95%] h-[95%] resize-none overflow-hidden border rounded p-2" />
            </div>

            {/* 카테고리 선택 */}
            <div className="h-[25px] px-[15px] text-center items-center jusfity-center">
                <label className="font-bold">제품 태그 선택</label>

            </div>
            <div className="h-[50px] px-[15px] border-b-[2px] border-[#FEB162] grid grid-cols-6 gap-4">
                {category_lists.map((item) => {
                    const isActive = activeTags.includes(item.value);
                    return (
                        <button key={item.key} onClick={() => handleClick(item.value)}
                            className="w-full h-full flex-col justify-center text-center">
                            <p className={`
                                    w-full h-[80%]  hover:opacity-100 rounded-2xl text-[11px]
                                    transition-opacity duration-200 flex items-center justify-center
                                    ${isActive ? 'bg-[#FEB162] opacity-90 font-bold' : 'bg-[#DED1D2] opacity-70 font-medium'}`}>
                                {item.name || '이름 없음'}</p>
                        </button>
                    );
                })}
            </div>
            <div className="flex h-[10px]"></div>
            <button className="flex justify-center items-center w-[90%] h-[50px] self-center font-bold
            bg-[#DED1D2] hover:bg-[#FEB162] hover:shadow-[0_0_8px_#FEB162] transition-all duration-250 rounded-2xl">글 게시</button>
        </div>
    );
}
