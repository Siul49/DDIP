// components/AgreementBox.jsx
export default function AgreementBox({ agreed, onChange }) {
    return (<div>
        <h2 className="text-center text-[20px] font-semibold mb-2">개인정보 제공 동의</h2>
        <div className="border border-[#D9D9D9] rounded-[10px] bg-white p-[15px] 
        font-[Pretendard Variable] text-sm text-gray-800 mb-6 w-full max-w-[460px] mx-auto shadow">
            <div className="space-y-2 leading-relaxed">
                <p><strong>[개인정보 수집 및 이용 동의서]</strong><br />
                회사는 개인정보 보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하고,
                적법하게 수집·이용하고자 아래와 같이 동의를 받고자 합니다.
                </p>

                <p><strong>1. 수집하는 개인정보 항목</strong><br />
                필수 항목: 이름, 별명, 전화번호, 전화번호, 비밀번호<br />
                선택 항목: 프로필 이미지, 이메일 주소</p>

                <p><strong>2. 개인정보 수집·이용 목적</strong><br />
                회원 가입 및 본인 확인<br />
                서비스 제공 및 맞춤형 정보 제공<br />
                고객 문의 응대 및 분석자료 정리</p>

                <p><strong>3. 보유 및 이용 기간</strong><br />
                수집일로부터 회원정보 수집 및 이용 목적 달성 시까지 보관<br />
                단, 관련 법령에 따라 보존이 필요한 경우에는 해당 기간 동안 보존</p>

                <p><strong>4. 동의 거부 권리 및 불이익</strong><br />
                귀하는 개인정보 수집·이용에 동의하지 않을 수 있습니다.<br />
                단, 필수 항목에 대한 동의를 거부할 경우 서비스 이용이 제한될 수 있습니다.</p>


                <div className="flex items-center mt-[25px]">
                <input 
                    type="checkbox"
                    id="agree"
                    checked={agreed}
                    onChange={(e) => onChange(e.target.checked)}
                    className="mr-2"
                />
                <label htmlFor="agree" className="text-[13px]">위 내용을 충분히 이해하였으며, 개인정보 수집 및 이용에 동의합니다.</label>
            </div>
        </div>
    </div>
    </div>
    );
}
