'use client'

import ItemList from "@components/category/item-list";
import {useState} from "react";
import Category from "@components/category/category-form";
import Nav from "@components/common/nav";


export default function CategoryPage() {
    const [selectedCategory, setSelectedCategory] = useState('식재료');

    return(
        <div className={'relative w-full h-full flex flex-col justify-center bg-[#FFFCED] text-center'}>
            <Nav />
            <div className="h-16"/>
            <div className="w-[80%] mx-auto">
                <Category onSelect={setSelectedCategory} />
            </div>
            <h1 className={"font-bold text-3xl"}>{selectedCategory}</h1>
            <ItemList category={selectedCategory} />
        </div>
    )
}
