import Image from 'next/image'
import { useState } from 'react';
import category_lists from '@constants/simpleDB';
console.log(category_lists);

export default function Category({onSelect}) {

    const [activeIndex, setActiveIndex] = useState(null);
    const handleClick = (selected_index) => {
        setActiveIndex(selected_index);
        if (onSelect) onSelect(selected_index);
    };
    return (
        <section className="relative w-full flex flex-col items-center justify-center">
            <h2 className={"absolute w-full top-16 font-bold text-3xl text-center"}>카테고리</h2>
            <div className={"relative top-30 w-[75%] h-65 grid grid-cols-6 gap-4 rounded-2xl"}>
                {category_lists.map((item) => (
                    <button key={item.key} onClick={() => handleClick(item.value)} className="relative w-full h-full p-4
                        flex flex-col justify-center text-center">
                        <div className={"absolute w-full h-[90%]"}>
                            <Image src={`/categoryImg/${item.value}.png`} fill
                                     className=" w-full h-full bg-[#FFF5D8] hover:bg-[#FFC6B8] rounded-2xl p-4 object-contain select-transition mb-2" alt="이미지"/>
                        </div>
                        <p className={"absolute w-full h-[15%] bottom-[-15%] z-50 bg-[#FFF5D8] hover:bg-[#FFC6B8] rounded-2xl text-2xl"}>{item.name || '이름 없음'}</p>
                    </button>
                ))}
            </div>
        </section>
    )
}