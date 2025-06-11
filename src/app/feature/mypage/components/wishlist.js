import { useState } from "react";

export default function ProductWishList() {
    //예시 코드
    const allProducts = [
        { name: '제품 A', price: 2300 },
        { name: '제품 B', price: 4500 },
        { name: '제품 C', price: 12000 },
        { name: '제품 D', price: 9900 },
        { name: '제품 E', price: 7000 },
        { name: '제품 F', price: 1800 },
    ];

    return (
        <div className="mt-[80px]">
            <p className='font-semibold text-[20px] text-[#404040] text-left'>관심 상품</p>
            <ProductSlider products={allProducts} visibleCount={4} slideCount={2}/>
        </div>
    );
}


//카드 슬라이더
function ProductSlider({ products, visibleCount = 4, slideCount = 2 }) {
    const [start, setStart] = useState(0);

    const maxStart = Math.max(0, products.length - visibleCount);

    const handlePrev = () => setStart(prev => Math.max(0, prev - slideCount));
    const handleNext = () => setStart(prev => {
        // 마지막 이동 시 남은 상품이 slideCount 미만이어도 끝까지 보여주기
        const next = prev + slideCount;
        return next > maxStart ? maxStart : next;
    });

    // 마지막 슬라이드에서 더이상 이동 못하게 처리
    const isNextDisabled = start >= maxStart || products.length <= visibleCount;
    const isPrevDisabled = start === 0;

    const slideWidth = 170;
    const transitionStyle = {
        display: 'flex',
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        transform: `translateX(-${start * slideWidth}px)`,
        width: products.length * slideWidth
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 24 }}>
            <button onClick={handlePrev} disabled={isPrevDisabled} style={{ marginRight: 8 }}>{'<'}</button>
            <div style={{ overflow: 'hidden', width: visibleCount * slideWidth }}>
                <div style={transitionStyle}>
                    {products.map((p, idx) => (
                        <ProductCard key={idx} {...p} />  //여기를 기존 컴포넌트로 교체
                    ))}
                </div>
            </div>
            <button
                onClick={handleNext}
                disabled={isNextDisabled}
                style={{ marginLeft: 8 }}
            >{'>'}</button>
        </div>
    );
}


// 상품 카드 컴포넌트 (다~~~~~ 삭제)
function ProductCard({ price, name }) {
    return (
        <div style={{
            width: 150, height: 200, border: '1px solid #eee', margin: 8, borderRadius: 12, background: '#fff', display: 'inline-block'
        }}>
            <div style={{ height: 120, background: '#fafafa', borderRadius: 12 }} />
            <div style={{ padding: '12px 8px' }}>
                <div style={{ fontSize: 14, color: '#888' }}>{name}</div>
                <div style={{ fontWeight: 'bold', color: '#d32f2f', marginTop: 4 }}>{price.toLocaleString()}원</div>
            </div>
        </div>
    );
}