'use client'

import Category from './feature/category/components/category-form';
import Main from './home/page'
import Footer from "./components/footer";
import NavClient from "@components/common/Nav.client";
import {useState} from "react";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('ingredient');

    return (
        <div className={'relative w-full h-full flex flex-col justify-center bg-[#FFFCED] text-center'}>
            <NavClient />
            <Main />
            <Category onSelect={setSelectedCategory} />
            <Footer />
        </div>
    );
}