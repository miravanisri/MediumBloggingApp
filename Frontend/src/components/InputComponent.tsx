import { ChangeEvent } from "react"

interface inputValues{
    label: string,
    placeholder: string,
   
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    type1?:string
}

   
export const InputComponent=({label,placeholder,onChange,type1}:inputValues)=>{
    return(
        <div className="mb-3">
            <div className="mb-2 font-semibold">
                {label}
            </div>
            <div>
                <input  placeholder={placeholder} onChange={onChange} type={type1||"text"}className="border rounded-md w-96 p-2 h-10 text-slate-600 " required></input>

            </div>


        </div>

    )
}



