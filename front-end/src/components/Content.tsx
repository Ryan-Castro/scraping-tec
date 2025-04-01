import Card from "./Card";

interface IContent{
    Items:{}
    thumb: string,
    nome: string,
    preco: number,
    link: string,
    loja: string
}
export default function Content(props: any) {
    return (
        <div className="w-full h-full px-24 pb-52 bg-zinc-900">
            <div className="w-full h-full overflow-y-auto pr-0.5 flex flex-col gap-2">
                {props.Items.map((item:any, i:any)=><Card key={i} title={item.nome} price={item.preco} link={item.link} src={item.thumb} shopp={item.loja}/>)}
            </div>
        </div>
    );
  }
  