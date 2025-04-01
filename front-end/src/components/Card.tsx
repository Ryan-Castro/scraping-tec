import Image from "next/image";

interface ICard{
    src: string,
    title: string,
    price: number,
    link: string,
    shopp: string
}

export default function Card(props:ICard) {
    return (
        <a className="hover:bg-slate-300 rounded-lg h-40 flex items-center bg-zinc-200 " href={props.link}>
            <Image src={props.src} alt="" width="100" height={100} className="w-40 h-40 rounded"/>
            <div className="pl-2 text-lg">
                <h2 className="mb-1 text-2xl">{props.title}</h2>
                <p>Preço: <span className="text-xl">R${props.price}</span></p>
                <p>Loja: {props.shopp}</p>
            </div>
        </a>
    );
  }
  