import Image from "next/image";

interface ICard{
    src: string,
    title: string,
    price: number,
    link: string
}

export default function Card(props:ICard) {
    return (
        <a className="text-white p-4 flex" href={props.link}>
            <Image src={props.src} alt="" width="100" height={100}/>
            <div className="pl-2">
                <h2 className="mb-2">{props.title}</h2>
                <p>Preço: <span className="text-xl">R${props.price}</span></p>
            </div>
        </a>
    );
  }
  