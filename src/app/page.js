'use client';

import Category from './feature/category/components/category-form';
import Main from './home/page'
import Shortcut from './components/common/shortcut';
import { useState } from 'react';
import ItemList from './components/item-list';
import ItemExplain from './item/page';
import Navs from "@components/nav";
import Footer from "@components/footer";


export default function Home() {
    const [mode, setMode] = useState('home');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div className={'relative w-full h-full flex flex-col justify-center  text-center'}>
        <Shortcut/>
            <Navs/>


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
                    <div className="h-100"/>
                    <ItemList selectedCategoryValue={selectedCategory}
                              onSelect={(productID) => {
                                  setSelectedProduct(productID);
                                  setMode('product');
                              }}
                    />
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

