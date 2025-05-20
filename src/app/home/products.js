import Image from 'next/image'
import {useState} from "react";
import ingredient_lists from '@constants/categoryDB';


export function Products({onSelect}) {
    const [activeIndex, setActiveIndex] = useState(null);
    const handleClick = (selected_index) => {
        setActiveIndex(selected_index);
        if (onSelect) onSelect(selected_index);
    };
    return (
        <section className="relative w-full h-full  flex justify-center text-center">

            <div className={"absolute top-15  w-[65%] aspect-square grid grid-cols-4 grid-rows-4 rounded-2xl"}>
                {ingredient_lists.map(item => (
                    <button key={item.key} className="relative  aspect-square hover:bg-gray-300/40 select-transition w-full h-full p-4 rounded-2xl"
                            onClick={() => handleClick(item.key)} >
                            <Image
                                src="/testimage.png"
                                fill
                                className=" w-full h-full p-4 object-contain "
                                alt="이미지"
                            />
                            <p className={"mt-50 z-50 text-2xl"}>{item.value}</p>

                        </button>
                ))}
            </div>
        </section>
    )
}