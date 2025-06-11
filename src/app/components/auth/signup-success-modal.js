import {useRouter} from "next/navigation";

export default function SignupSuccessModal({message}) {

    const router = useRouter();
    const goHome = () => {
        router.push('/login');
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center w-90">
                <p className="mb-4 m-2 font-semibold">{message}</p>
                <div className="justify-center">
                    <button onClick={goHome} className="bg-yellow-400 mt-4 mr-2 py-2 rounded-4xl text-white w-32 font-semibold">확인</button>
                </div>
            </div>
        </div>
    );
}