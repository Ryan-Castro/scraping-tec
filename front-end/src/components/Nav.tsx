
export default function Nav() {
    const StyleLi = "w-1/3 h-10 flex justify-center items-center bg-zinc-900 border border-b-0 rounded-tl-xl rounded-tr-xl text-2xl opacity-50"
    const StyleLiActive = "w-1/3 h-12 flex justify-center items-center bg-zinc-950 border border-b-0 rounded-tl-xl rounded-tr-xl text-3xl"
    return (
        <div className="w-full bg-zinc-800 text-white ">
            <ul className="w-full p-5 pb-0 pt-3 flex justify-between items-end">
                <li className={StyleLiActive}>placa de vídeo</li>
                <li className={StyleLi}>processador</li>
                <li className={StyleLi}>armazenamento</li>
            </ul>
        </div>
    );
  }
  