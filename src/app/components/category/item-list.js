'use client';

    import Image from 'next/image';
import { useState, useEffect } from 'react';
import {useRouter} from "next/navigation";
import category_lists from '../../../constants/simpleDB';

export default function ItemList({ category }) {
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
        const filteredItem = category
            ? items.filter(item => item.itemCategory === category)
            : items;
        setFilteredItems(filteredItem);
    }, [category, items])

    console.log(category);
    function getValueByName(name) {
        const found = category_lists.find(item => item.name.trim() === name.trim());
        return found ? found.value : null;
    }
    const value = getValueByName(category);

    if (!value) return null;
    console.log(value);

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
                            src={
                                item.image && item.image.startsWith('data:image')
                                    ? item.image
                                    : `/categoryImg/${value}.png`
                            }
                            className="relative w-full h-[90%] top-0 p-4 object-contain"
                            alt="이미지"
                            width={200} height={200}
                        />
                        <p className="absolute w-full h-[10%] bottom-0 z-50 text-2xl">{item.title}</p>
                    </button>
                ))}
            </div>
        </section>
    );
}