import Image from "next/image";
import Shortcut from "../shortcut/shortcut";


export default function Main() {

    return (
        <div className={"flex flex-col w-full h-full bg-none justify-center text-center"}>
            <Shortcut />
            <div className="relative top-0 w-full h-[80vh] bg-[url(/textured-paper.png)] flex justify-center">
                <div className="absolute inset-0 bg-lime-500/30 mix-blend-multiply" />
                <div className="absolute w-[32%] h-[30%] top-[42%]" >
                    <Image fill src="/DDIP.png" className={"object-contain"}  alt="사진이미지"/>
                </div>

                <div className="absolute searchslot w-[60%] h-16 bottom-24 flex items-center">
                    <input type="text" id="search" minLength="0" className="absolute w-[90%] h-full left-4 outline-0"/>
                    <button className={"absolute bg-green-500 hover:bg-green-400 rounded-full w-36 h-[80%] right-2 font-bold text-white select-transition"}>
                        SEARCH</button>
                </div>

                <div className={"absolute bg-gray-20 w-[75%] h-8 bottom-8 rounded-2xl"}></div>
            </div>
        </div>
    )
}