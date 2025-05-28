'use client';

import { useState } from 'react';
import Navs from '@components/common/nav';
import Main from '@home/index';
import Category from '@home/components/category-form';
import ItemList from '@home/components/item-list';
import ItemExplain from '@home/components/item-explain';
import SignUp from '@auth/index';
import Shortcut from '@components/common/shortcut';




export default function Home() {
    const [mode, setMode] = useState('home');
    const [sign, setSign] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div className={'relative w-full h-full flex flex-col justify-center bg-[#FFFCED] text-center'}>
            <Navs onSelect={(index) => {
                setSign(index);
                setMode('sign');
            }}/>
            <Shortcut/>
            {mode === 'sign' &&(
                <>
                    <SignUp/>
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
                    <ItemList onSelect={(index) => {
                        setSelectedProduct(index);
                        setMode('product');
                    }} />
                </>
            )}

            {mode === 'product' && (
                <>
                    <ItemExplain onSelect={selectedProduct} />
                </>
            )}

        </div>
    );

}

