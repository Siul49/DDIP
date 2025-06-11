'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const categories = [
    '식재료',
    '간편식/냉동식품',
    '생활용품',
    '대용량',
    '배달음식',
    '나눔템',
];

export default function CategorySidebar({ category, onSelect }) {
    const [selected, setSelected] = useState(category || null);
    const router = useRouter();

    useEffect(() => {
        setSelected(category);
    }, [category]);

    const handleClick = (category) => {
        setSelected(category);
        if (onSelect) onSelect(category);

        // 예: 선택한 카테고리에 따라 이동 (경로는 필요에 맞게 수정)
        router.push(`/feature/category?selected=${encodeURIComponent(category)}`);
    };

    return (
        <aside className="w-[180px] min-h-screen p-6 mt-[210px] text-left">
            <h2 className="text-[22px] font-bold mb-6">카테고리</h2>
            <ul className="space-y-[15px] text-[#838383] font-regular">
                {categories.map((cat) => (
                    <li
                        key={cat}
                        onClick={() => handleClick(cat)}
                        className={`cursor-pointer hover:text-[#404040] font-medium transition-colors ${
                            selected === cat ? 'font-medium text-[#404040]' : ''
                        }`}
                    >
                        {cat}
                    </li>
                ))}
            </ul>
            <hr className="mt-10 border-gray-300" />
        </aside>
    );
}
