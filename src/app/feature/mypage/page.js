'use client';

import { useState } from "react";
import MypageMain from "./components/mypage";
import CategorySidebar from "./components/category-sidebar";

export default function Mypage() {
    return (
        <div className="flex justify-center">
            <main className="flex w-[1146px] h-full">
                <CategorySidebar/>
                <div className="flex-1 ml-[30px]">
                    <MypageMain />
                </div>
            </main>
        </div>
    )
}
