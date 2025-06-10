import React, { useState } from 'react';

const categories = [
    '식재료',
    '간편식/냉동식품',
    '생활용품',
    '대용량',
    '배달음식',
    '나눔템',
];

export default function CategorySidebar({ onSelect }) {
    const [selected, setSelected] = useState(null);

    const handleClick = (category) => {
        setSelected(category);
        onSelect(category);
    };

    return (
        <aside className="w-[180px] min-h-screen p-6 mt-[210px] text-left">
            <h2 className="text-[22px] font-bold mb-6">카테고리</h2>
            <ul className="space-y-[15px] text-[#838383] font-regular">
                {categories.map((category) => (
                    <li
                        key={category}
                        onClick={() => handleClick(category)}
                        className={`cursor-pointer hover:text-[#404040] font-medium transition-colors ${
                            selected === category ? 'font-medium text-[#404040]' : ''
                        }`}>
                        {category}
                    </li>
                ))}
            </ul>
            <hr className="mt-10 border-gray-300" />
        </aside>
    );
}
