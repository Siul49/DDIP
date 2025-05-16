import Image from 'next/image'
import { useState } from 'react';
import category_lists from '@constants/simpleDb';
export function Category({onSelect}) {

    const [activeIndex, setActiveIndex] = useState(null);
    const handleClick = (selected_index) => {
        setActiveIndex(selected_index);
        if (onSelect) onSelect(selected_index);
    };
    return (
        <section className="relative w-full flex flex-col items-center justify-center bg-[#FFFCED]">
            <h2 className={"absolute w-full top-16 font-bold text-3xl text-center"}>카테고리</h2>
            <div className={"relative top-30 bg-gray-200 w-[75%] h-65 grid grid-cols-6 rounded-2xl"}>
                {category_lists.map((item,index) => (
                    <button key={item.key} onClick={() => handleClick(Number(index.key)+1)} className="relative w-full h-full">
                        <Image src={`/categoryImg/${item.value}.png`} fill
                               className=" w-full h-full p-4 object-contain hover:bg-gray-300 select-transition" alt="이미지"/>
                    </button>
                ))}
            </div>
        </section>
        )
}