'use client';

import Category from './feature/category/components/category-form';
import Main from './home/page'

export default function Home() {

    return (
        <div className={'relative w-full h-full flex flex-col justify-center bg-[#FFFCED] text-center'}>
            <Main />
        </div>
    );
}