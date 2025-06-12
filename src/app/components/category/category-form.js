'use client';

import Image from 'next/image'
import category_lists from '@constants/simpleDB';
import {useRouter} from "next/navigation";

export default function Category({onSelect}) {
    const router = useRouter();

    const handleClick = (selected_index) => {
        if (onSelect) onSelect(selected_index);
        router.push('/feature/category')
    };

    return (
        <section className="relative w-full flex flex-col items-center justify-center mb-70">
            <h2 className="text-3xl font-bold mt-18">카테고리</h2>
            <div className={"relative top-8 w-[1146px] h-56 grid grid-cols-6 gap-4 rounded-2xl"}>
                {category_lists.map((item) => (
                    <button key={item.key} onClick={() => handleClick(item.name)}
                            className="relative w-[170px] h-[170px] p-4 flex flex-col justify-center text-center aspect-square group">
                        <div className={"absolute w-full h-full"}>
                            <Image src={`/categoryImg/${item.value}.png`}
                                   fill
                                   className=" w-full h-full bg-[#FFF5D8] group-hover:bg-[#FFC6B8] rounded-3xl p-4 object-contain select-transition mb-2 transition-colors duration-350"
                                   alt="이미지"/>
                        </div>
                        <p className={"absolute w-full h-[20%] bottom-[-30%] z-50 p-2 bg-[#FFF5D8] group-hover:bg-[#FFC6B8] rounded-3xl " +
                            "text-[19px] transition-colors duration-350 flex justify-center items-center text-center "}>
                            {item.name || '이름 없음'}
                        </p>
                    </button>
                ))}
            </div>
        </section>
    )
}
