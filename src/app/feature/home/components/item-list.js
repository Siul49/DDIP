'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ItemList({ selectedCategoryValue, onSelect }) {
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api');  // API 경로 수정
                if (!res.ok) throw new Error('API 호출 실패');
                const data = await res.json();
                setItems(data);
            } catch (error) {
                console.error('데이터 불러오기 실패:', error);
            }
        };

        fetchData();
    }, []);

    const handleClick = (id) => {
        setActiveIndex(id);
        if (onSelect) onSelect(id);
    };

    const filteredItems = selectedCategoryValue
        ? items.filter(item => item.value === selectedCategoryValue)
        : items;

    return (
        <section className="relative w-full h-full flex justify-center text-center">
            <div className="absolute top-15 w-[65%] aspect-square grid grid-cols-4 grid-rows-4 rounded-2xl">
                {filteredItems.map((item) => (
                    <button
                        key={item._id.toString()}
                        className={`relative aspect-square hover:bg-gray-300/40 select-transition w-full h-full p-4 rounded-2xl ${
                            activeIndex === item._id? 'bg-gray-200' : ''
                        }`}
                        onClick={() => handleClick(item._id)}
                    >
                        <Image
                            src="/testimage.png"
                            fill
                            className="w-full h-full p-4 object-contain"
                            alt="이미지"
                        />
                        <p className="mt-50 z-50 text-2xl">{item.name}</p>
                    </button>
                ))}
            </div>
        </section>
    );
}
