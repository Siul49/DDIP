'use client';

import { useState } from 'react';
import { Navs } from '@home/nav';
import { Main } from '@home/main';
import {Category} from '@home/category';
import {Products} from '@home/products';
import {Item} from '@home/item';
import {Signup} from '@signup/signpage.js';




export default function Home() {
    const [mode, setMode] = useState('home');
    const [signup, setSignup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
    <div className={'relative w-full h-full flex flex-col justify-center bg-[#FFFCED] text-center'}>
        <Navs onSelect={(index) => {
            setSignup(index);
            setMode('sign');
        }}/>
        {mode === 'sign' &&(
            <>
                <Signup/>
            </>
        )}

        {mode === 'home' && (
            <>
                <Main />
                <Category onSelect={(index) => {
                    setSelectedCategory(index);
                    setMode('category');
                }} />
            </>
        )}

        {mode === 'category' && (
            <>
                <div className="h-16"/>
                <div className="w-[80%] mx-auto">
                    <Category onSelect={setSelectedCategory} />
                </div>
                <div className="h-50"/>
                <h1 className={"font-bold text-3xl"}>{selectedCategory}</h1>
                <Products onSelect={(index) => {
                    setSelectedProduct(index);
                    setMode('product');
                }} />
            </>
        )}

        {mode === 'product' && (
            <>
                <Item onSelect={selectedProduct} />
            </>
        )}

    </div>
    );

}

