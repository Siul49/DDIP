import Image from 'next/image'
import product_lists from '@constants/categoryDB';

export function Item({selectedProduct, onSelect }) {
    const productData = product_lists[onSelect];

    return (
        <section className="relative w-full h-full bg-[#FFFCED] flex justify-center text-center">
            <h2 className={"absolute w-full top-24 font-bold text-3xl text-center"}>
                {productData ? productData.name : '선택된 상품이 없습니다.'}
            </h2>
            <div className={"relative top-48 bg-white w-[75%] h-[70vh] grid grid-cols-6 rounded-2xl border-2"}></div>
        </section>
    )
}