import Image from 'next/image'
import {useState} from "react";

export function Products({onSelect}) {
    const [activeIndex, setActiveIndex] = useState(null);
    const handleClick = (selected_index) => {
        setActiveIndex(selected_index);
        if (onSelect) onSelect(selected_index);
    };
    return (
        <section className="relative w-full h-full bg-[#FFFCED] flex justify-center text-center">

            <h2 className={"absolute w-full font-bold text-3xl text-center"}>상품 목록</h2>
            <div className={"absolute top-15 bg-gray-200 w-[65%] aspect-square grid grid-cols-4 grid-rows-4 rounded-2xl"}>
                {Array.from({ length: 16 }).map((_, indexProduct) => (
                    <button key={indexProduct} className="relative w-full aspect-square hover:bg-gray-300 select-transition p-4"
                            onClick={() => handleClick(indexProduct+1)} >
                        <div className={"relative w-full h-full"}>
                            <Image
                                src="/testimage.png"
                                fill
                                className="object-contain "
                                alt="이미지"
                            />
                        </div>
                        </button>
                ))}
            </div>
        </section>
    )
}