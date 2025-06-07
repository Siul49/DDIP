export default function ConfirmModal({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center w-90">
                <p className="mb-4 m-2 font-semibold">상품을 등록하시겠습니까?</p>
                <div className="flex justify-between">
                    <button onClick={onCancel} className="border border-yellow-400 border-[1.5px] mt-4 ml-2 py-2 rounded-4xl w-32 font-semibold">닫기</button>
                    <button onClick={onConfirm} className="bg-yellow-400 mt-4 mr-2 py-2 rounded-4xl text-white w-32 font-semibold">등록하기</button>
                </div>
            </div>
        </div>
    );
}
