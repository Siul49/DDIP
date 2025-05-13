export function Main() {


    return (
        <div className={"relative w-full h-full bg-[#FFFCED] flex justify-center text-center"}>
            <div className="relative top-0 w-full h-[80vh] bg-[url(/textured-paper.png)] flex justify-center">
                <div className="absolute inset-0 bg-lime-500/30 mix-blend-multiply" />
                <img className="absolute h-64 bottom-64" src="/DDIP.png" alt="사진이미지"/>

                <div className="absolute searchslot w-[60%] h-16 bottom-24 flex items-center">
                    <input type="text" id="search" minLength="0" className="absolute w-[90%] h-full left-4 outline-0"/>
                    <button className={"absolute bg-green-500 hover:bg-green-400 rounded-full w-36 h-[80%] right-2 font-bold text-white select-transition"}>
                        SEARCH</button>
                </div>

                <div className={"absolute bg-gray-20 w-[75%] h-8 bottom-8 rounded-2xl"}>
                    <div className={"absolute w-full h-full grid grid-cols-10 gap-x-15 items-center justify-center"}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <button
                                key={index}
                                className="min-w-16 w-full h-10 bg-gray-500 hover:bg-gray-400 rounded-full select-transition"
                            ></button>
                        ))}
                    </div>
                </div>

                <p className={"absolute right-5 bottom-5"}></p>
            </div>



            <h2 className={"absolute top-220 w-full font-bold text-3xl"}>카테고리</h2>
            <div className={"absolute top-240 bg-gray-200 w-[75%] h-65 grid grid-cols-6 rounded-2xl"}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <img src="/testimage.png"
                         className=" w-full h-full p-4 object-cover hover:bg-gray-300 select-transition" alt="이미지"/>
                ))}
         </div>

            <h2 className={"absolute top-320 w-full font-bold text-3xl"}>마감 직전 상품 목록</h2>
            <div className={"absolute top-340 bg-gray-200 w-[75%] h-65 grid grid-cols-6 rounded-2xl"}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <img src="/testimage.png"
                         className=" w-full h-full p-4 object-cover hover:bg-gray-300 select-transition" alt="이미지"/>
                ))}
            </div>
        </div>
    )
}