import Image from "next/image";


export default function Main() {

    return (
        <div className={"flex flex-col w-full h-full bg-none justify-center text-center"}>

            <div className="relative top-0 w-full h-[80vh] bg-[url(/background.png)] flex justify-center bg-cover">

                <div className="absolute w-[32%] h-[30%] top-[42%]" >
                    <Image fill src="/DDIP.png" className={"object-contain"}  alt="사진이미지"/>
                </div>

                <div className="absolute searchslot w-[60%] h-16 bottom-10 flex items-center pl-6 pr-4 gap-4">
                    <Image src="/Search.png" className={"object-contain"}  alt="검색 아이콘" width={24} height={24}/>
                    <input type="text" placeholder = "제품명을 입력하세요" id="search" minLength="0" className="absolute w-[90%] h-full left-20 outline-0 text-xl font-medium focus:outline-none focus:ring-0 focus:shadow-none
"/>
                    <button className={"absolute bg-[#FADD88] hover:bg-[#FFD24E] rounded-full w-36 h-[80%] right-2 font-semibold text-[#505050] text-lg select-transition tracking-widest"}>
                        SEARCH</button>
                </div>

                <div className={"absolute bg-gray-20 w-[75%] h-8 bottom-8 rounded-2xl"}></div>
            </div>
        </div>
    )
}