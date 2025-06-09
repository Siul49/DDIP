'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';


export default function ItemList({ selectedCategoryValue, onSelect }) {
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/item');
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
    console.log('items:',items);

    return (
        <section className="relative w-full h-full flex justify-center text-center">

            <div className="absolute top-15 w-[65%] aspect-square grid grid-cols-4 grid-rows-4 rounded-2xl">
                {filteredItems.map((item) => (
                    <button
                        key={item.itemId}
                        className={`relative aspect-square hover:bg-gray-300/40 select-transition w-full h-full p-4 rounded-2xl ${
                            activeIndex === item.itemId? 'bg-gray-200' : ''
                        }`}
                        onClick={() => handleClick(item.itemId)}
                    >
                        <Image
                            src="/testimage.png"
                            fill
                            className="w-full h-full p-4 object-contain"
                            alt="이미지"
                        />
                        <p className="mt-50 z-50 text-2xl">{item.title}</p>
                    </button>
                ))}
            </div>
        </section>
    );
}