import Image from 'next/image';
import ProductManage from "./manage";
import ProductWishList from "./wishlist";
import ProfileEdit from "./profile-edit";
import { useState, useEffect } from 'react';

export default function MypageMain() {
    const [selected, setSelected] = useState('내 상품 관리');

    const [editMode, setEditMode] = useState(false);
    // 간이 사용자 정보 상태값
    const [userInfo, setUserInfo] = useState({
        name: '독고다히',
        username: 'dokkk0dahee',
        bio: '한줄 소개 쏼라쏼라 어쩌르티비 홍홍홍~',
        address: '주소에옹 주소주소주소~',
        picture: '/hoho.png',
    });


    return (
        <section className="w-[950px] mt-[190px] px-[20px] py-[40px]
            border-[1px] border-[#D9D9D9] rounded-[30px]">
            {/* 이용자 정보 */}
            {editMode ? (
                <ProfileEdit
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    onCancel={() => setEditMode(false)}
                />
            ) : (
                <div className="flex gap-[30px] justify-center items-start">
                    {/* 좌측: 사진, 정보 수정 */}
                    <div className="relative w-[185px] h-[200px] rounded-[20px] flex-col items-center justify-start">
                        <Image
                            src={userInfo.picture}
                            alt="상품 이미지"
                            width={185}
                            height={185}
                            className="object-contain bg-[#FFF5DC] rounded-[20px]"
                        />

                        <button className="w-[185px] h-[22px] border-[1px] border-[#D9D9D9] rounded-[10px] mt-[10px]
                                    text-[13px] text-[#888C85] text-regular"
                                onClick={() => setEditMode(true)}>정보 수정하기</button>
                    </div>

                    {/* 우측: 상품 정보 */}
                    <div className="flex flex-col gap-[2px] w-[520px] ml-[20px] mt-[20px] text-left">
                        {/* 사용자 이름 */}
                        <h2 className="text-[28px] font-semibold">{userInfo.name}</h2>
                        {/* 사용자 아이디 */}
                        <p className='text-[14px] text-[#888C85] font-regular'>@{userInfo.username}</p>
                        {/* */}
                        <p className='text-[16px] text-[#000000] font-regular mt-[10px]'>{userInfo.bio}</p>
                        {/* */}
                        <p className='text-[14px] text-[#888C85] font-regular mt-[10px]'>{userInfo.address}</p>
                    </div>
                </div>
            )}


            {/* 상품 설명 */}
            {editMode ? null
                : (
                    <div className="mt-[150px] mx-[80px]">
                        <ProductManage selected={selected} onChange={setSelected} />
                        <ProductWishList />
                    </div>
                )}
        </section>
    );
}