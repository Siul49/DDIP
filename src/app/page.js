'use client'

import Category from '@components/category/category-form';
import Main from './feature/home/page'
import Nav from "@components/common/nav";
import {useEffect, useState} from "react";
import Shortcut from "./feature/shortcut/shortcut";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('ingredient');
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetch('/api/auth/check')
            .then(res => res.json())
            .then(data => setUser(data.user))
    }, [])

    return (
        <div className={'relative w-full h-full flex flex-col justify-center bg-[#FFFCED] text-center'}>
            <Nav />
            <Main />
            <Category onSelect={setSelectedCategory} />
        </div>
    );
}