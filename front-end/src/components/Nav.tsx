

interface INav{
    part: number,
    handlePart: any,
}


export default function Nav(props:INav) {
    const parts = ["placa de vídeo", "processador", "armazenamento"]
    const StyleLi = "       w-1/3 h-10 flex justify-center items-center bg-zinc-800 text-base opacity-50 text-center md:text-xl capitalize rounded-l-md"
    const StyleLiActive = " w-1/3 h-10 flex justify-center items-center bg-zinc-900 text-xl text-center md:text-2xl capitalize"
    return (
        <div className="w-full bg-zinc-900 text-white rounded-t-2xl">
            <ul className="w-full p-24 pb-0 pt-3 flex justify-between items-end gap-1">
                {   
                    parts.map((part, i)=>{
                        if( i == props.part){
                            return <li key={i} onClick={()=>{props.handlePart(i)}} className={StyleLiActive}>{part}</li>
                        } else {
                            return <li key={i} onClick={()=>{props.handlePart(i)}} className={StyleLi}>{part}</li>
                        }
                    })
                }
                <li className="text-"></li>
            </ul>
        </div>
    );
  }
  