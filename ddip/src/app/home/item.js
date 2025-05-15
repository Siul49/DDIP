import Image from 'next/image'

export function Item({onSelect}) {
    return (
        <section className="relative w-full h-full bg-[#FFFCED] flex justify-center text-center">
            <h2 className={"absolute w-full top-24 font-bold text-3xl text-center"}>상품 페이지</h2>
            <div className={"relative top-48 bg-white w-[75%] h-[70vh] grid grid-cols-6 rounded-2xl border-2"}></div>
        </section>
    )
}