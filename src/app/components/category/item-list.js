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
        <section className="relative w-full flex justify-center text-center mb-100">
            <div className="absolute w-[1146px] h-full grid grid-cols-4 rounded-[20px]">
                {filteredItems.map((item) => (
                    <button
                        key={item._id}
                        className="relative w-[240px] h-full rounded-2xl flex flex-col items-center
                          hover:bg-[#E9E9E9]/10 select-transition "
                        onClick={() => handleClick(item._id)}
                    >
                        <div className="relative w-[200px] h-[200px]">
                            <Image
                                src={
                                    item.image && item.image.startsWith('data:image')
                                        ? item.image
                                        : `/categoryImg/${value}.png`
                                }
                                className="relative w-full h-[200px] object-contain rounded-[20px]"
                                alt="이미지"
                                width={200} height={200}
                            />
                            <span className="absolute bottom-[10px] right-[5px] bg-[#FEB162] text-[#000000] text-[12px] text-regular px-[10px] py-[2px] rounded-[10px] shadow-sm">
                                1 / {item.totalNumberOfRecruits}
                            </span>
                        </div>
                        <div className="mt-auto w-[200px] left-[20px] ml-[10px] text-left">
                            {/* 이름 (한 줄 전체 차지) */}
                            <p className="block text-[20px] font-regular mt-[15px]">{item.title}</p>

                            {/* 나눈 가격 / '원' / 원래 가격 — 인라인 요소 */}
                            <div className="flex items-baseline gap-[4px]">
                                <span className="text-[#D42020] text-[30px] font-semibold">{item.pricePerEachPerson}</span>
                                <span className="text-[#000000] text-[20px] font-regular ml-[2px]">원</span>
                                <span className="text-[#888C85] line-through text-[16px] font-regular ml-[10px]">{item.totalPrice}원</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}