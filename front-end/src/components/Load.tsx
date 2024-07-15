import { useRef } from "react";

export default function Load(props:{isHidden: boolean}) {
    const screenLoadRef = useRef<HTMLDivElement>(null)
    if(props.isHidden){
        screenLoadRef.current?.classList.remove("flex")
        screenLoadRef.current?.classList.add("hidden")
    }else{
        screenLoadRef.current?.classList.remove("hidden")
        screenLoadRef.current?.classList.add("flex")
    }
    return (
        <div className="hidden h-screen w-screen absolute bg-black opacity-50 justify-center items-center" ref={screenLoadRef}>
            <div className="w-40 h-40 border rounded-full flex justify-center" id="loadCircle">
                <div className="w-5 h-5 bg-white rounded-full"></div>
            </div>
        </div>
    );
  }
  