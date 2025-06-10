'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {useRouter} from "next/navigation";


export default function ItemList({ selectedCategory }) {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/post/item');
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
        router.push(`/feature/product/${id}`);
    };
    
    useEffect(() => {
        const filteredItem = selectedCategory
            ? items.filter(item => item.itemCategory === selectedCategory)
            : items;
        setFilteredItems(filteredItem);

    }, [selectedCategory, items])
    console.log('items:',items);

    return (
        <section className="relative w-full h-full flex justify-center text-center">

            <div className="absolute top-15 w-[65%] aspect-square grid grid-cols-4 grid-rows-4 rounded-2xl">
                {filteredItems.map((item) => (
                    <button
                        key={item._id}
                        className="relative aspect-square hover:bg-gray-300/40 select-transition w-full h-full p-4 rounded-2xl"
                        onClick={() => handleClick(item._id)}
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