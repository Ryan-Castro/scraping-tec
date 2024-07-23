import { RefObject } from "react";

interface ISearch{
    inputs: {
        text: RefObject<HTMLInputElement>,
        shopp: RefObject<HTMLSelectElement>,
        order: RefObject<HTMLSelectElement>
    }
    handleSearch: ()=>void
}


export default function Search(props: ISearch) {
    return (
        <div className="w-full p-5 flex gap-5">
            <input type="text" placeholder="Nome da peça" className="pl-1 h-7" ref={props.inputs.text}/>
            <select name="" id="" className="pl-1 pr-6 h-7" ref={props.inputs.shopp}>
                <option value="">Todas as lojas</option>
                <option value="">Kabum</option>
                <option value="">terabyte</option>
                <option value="">pichau</option>
            </select>
            <select name="" id="" className="pl-1 pr-6 h-7" ref={props.inputs.order}>
                <option value="">Nome crescente</option>
                <option value="">Nome decrecente</option>
                <option value="">Preço crescente</option>
                <option value="">Preço decrecente</option>
            </select>
            <input type="button" value="Buscar" className="bg-cyan-600 text-white px-5 h-7 rounded"/>
        </div>
    );
  }
  