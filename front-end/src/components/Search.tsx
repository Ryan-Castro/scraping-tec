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
        <div className="w-full px-24 py-5 flex flex-col gap-1 justify-between md:flex-row md:gap-5 bg-zinc-900">
            <input type="text" placeholder="Nome da peça" className="w-1/4 pl-4 h-10 bg-zinc-800 rounded text-white" ref={props.inputs.text}/>
            <select name="" id="" className="w-1/4 pl-1 pr-6 h-10 bg-zinc-800 rounded text-white" ref={props.inputs.shopp}>
                <option value="all">Todas as lojas</option>
                <option value="kabum">Kabum</option>
                <option value="terabyte">terabyte</option>
                <option value="pichau">pichau</option>
            </select>
            <select name="" id="" className="w-1/4 pl-1 pr-6 h-10 bg-zinc-800 rounded text-white" ref={props.inputs.order}>
                <option value="nomeCrescente">Nome crescente</option>
                <option value="nomeDecrescente">Nome decrecente</option>
                <option value="precoCrescente">Preço crescente</option>
                <option value="precoDecrescente">Preço decrecente</option>
            </select>
            <input type="button" value="Buscar" className="w-1/5 bg-cyan-600 text-white px-5 h-10 rounded" onClick={props.handleSearch}/>
        </div>
    );
  }
  