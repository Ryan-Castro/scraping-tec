import Image from "next/image";

interface ICard{
    src: string,
    title: string,
    price: number,
    link: string
}

export default function Card(props:ICard) {
    return (
        <div>
            <Image src={props.src} alt="" width="100" height={100}/>
            <div>
                <h2>{props.title}</h2>
                <p>Preço: R${props.price}</p>
            </div>
        </div>
    );
  }
  