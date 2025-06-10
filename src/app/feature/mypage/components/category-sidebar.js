import React, { useState } from 'react';

const QuestionCategories = [
    '문의 사항'
];

const NoticeCategories = [
    '공지사항',
    '자주 묻는 질문',
    '띱 소개',
    '고객센터',
];

export default function CategorySidebar({ onSelect }) {
    const [selected, setSelected] = useState(null);

    const handleClick = (category) => {
        setSelected(category);
        onSelect(category);
    };

    return (
        <aside className="w-[180px] min-h-screen p-6 mt-[210px] text-left">
            <h2 className="text-[22px] font-bold mb-[15px]">문의</h2>
            <ul className="space-y-[15px] text-[#838383] font-regular">
                {QuestionCategories.map((question) => (
                    <li
                        key={question}
                        onClick={() => handleClick(question)}
                        className={`cursor-pointer hover:text-[#404040] font-medium ${
                            selected === question ? 'font-bold text-[#404040]' : ''
                        }`}
                    >
                        {question}
                    </li>
                ))}
            </ul>

            <h2 className="text-[22px] font-bold mt-[40px] mb-[15px]">공지</h2>
            <ul className="space-y-[15px] text-[#838383] font-regular">
                {NoticeCategories.map((notice) => (
                    <li
                        key={notice}
                        onClick={() => handleClick(notice)}
                        className={`cursor-pointer hover:text-[#404040] font-medium ${
                            selected === notice ? 'font-bold text-[#404040]' : ''
                        }`}
                    >
                        {notice}
                    </li>
                ))}
            </ul>
            <hr className="mt-10 border-gray-300" />
        </aside>
    );
}
