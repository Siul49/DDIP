import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ItemExplain({ onSelect }) {
    const [allData, setAllData] = useState([]);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('/api');
                if (!res.ok) throw new Error('데이터베이스를 못가져왔어요');
                const data = await res.json();
                setAllData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    useEffect(() => {
        if (!onSelect || allData.length === 0) {
            setProductData(null);
            return;
        }
        const found = allData.find(item => item._id === onSelect);
        setProductData(found || null);
    }, [onSelect, allData]);

    if (loading) return <p>로딩중...</p>;
    if (error) return <p className="text-red-500 font-bold">{error}</p>;
    if (!productData) return <p>등록된 상품정보가 없습니다.</p>;

    return (
        <section className="relative w-full h-full flex justify-center text-center ">
            <div className="relative top-48 bg-white w-[75%] h-[70vh] flex justify-center text-center items-center border-4 border-gray-500 rounded-2xl">
                <div className="absolute w-100 h-100 top-10 left-10 border-4 rounded-2xl ">
                    <Image
                        src="/testimage.png"
                        fill
                        className="w-full h-full p-4 object-contain"
                        alt="�̹���"
                    />
                </div>
                <h2 className="absolute w-[20%] h-[10%] top-10 right-[25%] bg-green-500 font-bold text-4xl">
                    ��ǰ��: {productData.name || '�̸� ����'}
                </h2>
                <h3 className="absolute w-[20%] h-[10%] top-30 right-[25%] bg-green-300 font-bold text-2xl">
                    �󼼼���: {productData.desc}
                </h3>
                <h3 className="absolute w-[20%] h-[10%] top-50 right-[25%] bg-green-300 font-bold text-2xl">
                    DDIP: {productData.price}�� / {productData.max}��
                </h3>
                <h3 className="absolute w-[20%] h-[10%] top-120 left-10 bg-green-300 font-bold text-2xl">
                    �����ο�
                </h3>
                <div className="absolute w-[25%] bottom-10 left-0 gap-4 grid grid-cols-4">
                    {Array.from({ length: productData.now }).map((_, idx) => (
                        <div key={idx} className="relative aspect-square rounded-full bg-[#000000]">
                            <Image
                                src="/testimage.png"
                                fill
                                className="w-full h-full p-2 object-fit rounded-full"
                                alt="�̹���"
                            />
                        </div>
                    ))}
                    {Array.from({ length: productData.max - productData.now }).map((_, idx) => (
                        <div key={idx} className="relative aspect-square rounded-full bg-[#000000]">
                            <div className="w-full h-full p-2 bg-white border-4 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}