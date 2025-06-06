import Navs from "@components/nav";
import ItemList from "@components/item-list";
import {useState} from "react";
import Category from "./components/category-form";


export default function CategoryPage() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    return(
        <div className={'relative w-full h-full flex flex-col justify-center bg-[#FFFCED] text-center'}>

            <Navs />
            <div className="h-16"/>
            <div className="w-[80%] mx-auto">
                {/*아이템 배열 최초값은 무작위 배열로 진행*/}
                <Category onSelect={setSelectedCategory} />
            </div>
            <div className="h-50"/>
            <h1 className={"font-bold text-3xl"}>{selectedCategory}</h1>
            <ItemList category={selectedCategory} onSelect={setSelectedProduct} />
        </div>
    )
}
