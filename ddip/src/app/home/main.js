import Image from 'next/image'

export function Main() {

    return (
        <div className={"relative w-full h-full bg-[#FFFCED] flex justify-center text-center"}>
            <div className="relative top-0 w-full h-[80vh] bg-[url(/textured-paper.png)] flex justify-center">
                <div className="absolute inset-0 bg-lime-500/30 mix-blend-multiply" />
                <div className="absolute w-[50%] h-[40%] top-[20%]" >
                    <Image fill src="/DDIP.png" className={"object-contain"}  alt="사진이미지"/>
                </div>

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
            </div>

        </div>
    )
}