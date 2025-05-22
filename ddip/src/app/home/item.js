import Image from 'next/image'
import ingredient_lists from '@constants/categoryDB';
import category_lists from "@constants/simpleDB";

export function Item({selectedProduct, onSelect }) {
    const productData = ingredient_lists[onSelect];
    return (
        <section className="relative w-full h-full  flex justify-center text-center ">
            <div className={"relative top-48 bg-white w-[75%] h-[70vh] flex justify-center text-center items-center border-4 border-gray-500 rounded-2xl"}>

                <div className={"absolute w-100 h-100 top-10 left-10 border-4 rounded-2xl "}>
                    <Image src="/testimage.png"
                           fill
                           className=" w-full h-full p-4 object-fit "
                           alt="이미지" />
                </div>
                <h2 className={"absolute w-[20%] h-[10%] top-10 right-[25%] bg-green-500 font-bold text-4xl"}>
                    제품명:{productData.value || '이름 없음'}
                </h2>
                <h3 className={"absolute w-[20%] h-[10%] top-30 right-[25%] bg-green-300 font-bold text-2xl"}>
                    상세설명:{productData.desc}
                </h3>
                <h3 className={"absolute w-[20%] h-[10%] top-50 right-[25%] bg-green-300 font-bold text-2xl"}>
                    DDIP:{productData.price}원 / {productData.team}명
                </h3>
                <h3 className={"absolute w-[20%] h-[10%] top-120 left-10 bg-green-300 font-bold text-2xl"}>
                    현재인원
                </h3>
                <div className={`absolute w-[25%] bottom-10 left-0 gap-4 grid grid-cols-4`}>
                    {Array.from({ length: productData.now }).map((_, idx) => (
                        <div key={idx} className="relative aspect-square rounded-full bg-[#000000]">
                                <Image src="/testimage.png" fill
                                       className=" w-full h-full p-2 object-fit rounded-full" alt="이미지"/>
                            </div>
                        ))}
                    {Array.from({ length: productData.team-productData.now }).map((_, idx) => (
                        <div key={idx} className="relative aspect-square rounded-full bg-[#000000]">
                            <div className=" w-full h-full p-2 bg-white border-4 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}