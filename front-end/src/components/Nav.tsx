

interface INav{
    part: number,
    handlePart: any,
}


export default function Nav(props:INav) {
    const parts = ["placa de vídeo", "processador", "armazenamento"]
    const StyleLi = "w-1/3 h-10 flex justify-center items-center bg-zinc-900 border border-b-0 rounded-tl-xl rounded-tr-xl text-2xl opacity-50"
    const StyleLiActive = "w-1/3 h-12 flex justify-center items-center bg-zinc-950 border border-b-0 rounded-tl-xl rounded-tr-xl text-3xl"
    return (
        <div className="w-full bg-zinc-800 text-white ">
            <ul className="w-full p-5 pb-0 pt-3 flex justify-between items-end">
                {   
                    parts.map((part, i)=>{
                        if( i == props.part){
                            return <li key={i} onClick={()=>{props.handlePart(i)}} className={StyleLiActive}>{part}</li>
                        } else {
                            return <li key={i} onClick={()=>{props.handlePart(i)}} className={StyleLi}>{part}</li>
                        }
                    })
                }
            </ul>
        </div>
    );
  }
  