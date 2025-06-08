// 클라이언트 컴포넌트
'use client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
    const router = useRouter();
    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        setTimeout(() => {
            window.location.reload()
            router.push('/')
        }, 50);
    };

    return (
        <button
            className="hover:text-gray-600"
            onClick={handleLogout}
        >
            로그아웃
        </button>
    );
}
