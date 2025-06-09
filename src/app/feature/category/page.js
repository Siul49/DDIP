'use client'

import ItemList from "./components/item-list";
import {useState} from "react";
import Category from "./components/category-form";
import NavClient from "@components/common/Nav.client";


export default function CategoryPage() {
    const [selectedCategory, setSelectedCategory] = useState('ingredient');
    const [selectedProduct, setSelectedProduct] = useState(null);

    return(
        <div className={'relative w-full h-full flex flex-col justify-center bg-[#FFFCED] text-center'}>
            <NavClient />
            <div className="h-16"/>
            <div className="w-[80%] mx-auto">
                <Category onSelect={setSelectedCategory} />
            </div>
            <div className="h-50"/>
            <h1 className={"font-bold text-3xl"}>{selectedCategory}</h1>
            <ItemList category={selectedCategory} onSelect={setSelectedProduct} />
        </div>
    )
}
