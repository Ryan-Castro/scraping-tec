"use client"

import Card from "@/components/Card";
import Header from "@/components/Header";
import Load from "@/components/Load";
import { useRef, useState } from "react";

interface Iitem{
  nome: string,
  preco: number,
  link: string,
  thumb: string
}

export default function Home() {
  const [items, setItems] = useState<Iitem[]>([])
  const [itemsFiltred, setItemsFiltred] = useState<Iitem[]>([])

  const menuRef = useRef<HTMLUListElement>(null)

  function  handleScrap(prod: string, index:number){
    let routes: string[] = []
    menuRef.current?.children[index].classList.add("bg-zinc-400")
    switch (prod) {
      case "placadevideo": routes = [
        "/terabyte/search/placavideoamd", 
        "/terabyte/search/placavideonvidia",  
        "/kabum/search/placavideoamd", 
        "/kabum/search/placavideonvidia", 
        "/pichau/search/placavideoamd",
        "/pichau/search/placavideonvidia"
      ];break;
      case "processador": routes = [
        "/terabyte/search/processadorintel",
        "/terabyte/search/processadoramd",
        "/kabum/search/processadorintel",
        "/kabum/search/processadoramd",
        "/pichau/search/processadorintel",
        "/pichau/search/processadoramd",
      ];break;
      case "promocoes": routes = [
        "/terabyte/search/promocoes", 
        "/kabum/search/promocoes", 
        "/pichau/search/promocoes",
      ];break;
      default:
        break;
    }
    let itemsref: Iitem[] = []
    routes.forEach(async (route)=>{
      await fetch("http://localhost:3333"+route).then((res)=>res.json()).then((json)=>{
        itemsref = [...itemsref, ...json]
      })
    })
    setItems(itemsref)
    setItemsFiltred(itemsref)
  }


  return (
    <main className="h-screen w-screen flex flex-col justify-between bg-zinc-900">
      <Load isHidden={false}></Load>
      <Header></Header>
      <section className="flex justify-center p-3" id="viewer">
        <div className="bg-white w-full h-full shadow shadow-zinc-600">
          <div className="bg-zinc-950 text-white flex justify-between items-center p-4" id="headerViewer">
            <h2 className="text-2xl">Produtos</h2>
            <div className="flex gap-6">
              <input type="text" placeholder="Posquisar por:"/>
              <select name="" id="">
                <option value="">Nome</option>
              </select>
            </div>
          </div>
          <div id="bodyViewer" className="flex">
            <div className="h-full w-1/4 bg-zinc-700 ">
              <ul className="text-zinc-200 text-xl" ref={menuRef}>
                <li className="p-4" onClick={()=>handleScrap("placadevideo", 0)}>Placa de vídeo</li>
                <li className="p-4" onClick={()=>handleScrap("processador", 1)}>Placa de Processadores</li>
                <li className="p-4" onClick={()=>handleScrap("promocoes", 2)}>Placa de Promoções</li>
              </ul>
            </div>
            <div className="bg-stone-950 w-3/4 h-full">
              {itemsFiltred.map((item, i)=>
                <Card 
                  key={i} 
                  src={item.thumb} 
                  title={item.nome} 
                  price={item.preco} 
                  link={item.link}
                />)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
