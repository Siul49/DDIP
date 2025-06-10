import Image
    from 'next/image'
import { useState, useEffect } from 'react';
import Item from './component/item';
import CategorySidebar from './component/category-sidebar';

//페이지 연결 이름 바꿔야함니두 아마?
export default function pruduct({ onSelect }) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="flex justify-center">
            <main className="flex w-[1146px] h-full">
                <CategorySidebar onSelect={setSelectedCategory} />
                <div className="flex-1 ml-[30px]">
                    <Item selectedProduct={selectedProduct} onSelect={selectedCategory} />
                </div>
            </main>
        </div>
    )
};
