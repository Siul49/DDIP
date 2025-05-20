export default function Input(
    { label, type = "text", name, value, onChange, placeholder, className="", }) {
    
    return (
        <div className={`flex flex-col items-center w-[460px] font-[Pretendard Variable] ${className}`}>
            <label htmlFor={name} className="w-full text-center text-[20px] font-semibold leading-normal">
                {label}
            </label>
            <input 
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}  /*회색부분으로 보이는 글씨*/
                required
                className="p-2 pl-4 w-full h-[50px] border border-[#D9D9D9] rounded-[10px] bg-white font-regular  
                    placeholder:text-[16px] placeholder:font-light"
            />
        </div>
    );
}

