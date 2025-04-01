"use client"

import Header from "@/components/Header"
import Load from "@/components/Load"
import Nav from "@/components/Nav"
import Search from "@/components/Search"
import Content from "@/components/Content"
import { useEffect, useRef, useState } from "react"
import moment from "moment"
import Fuse from 'fuse.js';

const options = {
  threshold: 0.3,
  keys: ['nome']
};

export default function Home() {
  const parts = ["placadevideo", "processador", "promocoes"]
  const [currentPart, setCurrentPart] = useState(0)
  const [Items, setItems] = useState<any>([])
  const inputs = {
    text: useRef<HTMLInputElement>(null),
    shopp: useRef<HTMLSelectElement>(null),
    order: useRef<HTMLSelectElement>(null)
  }

  function setPart(productNumber: number){
    inputs.text.current!.value = ""
    const shopSelect = inputs.shopp.current
    const OrderSelect = inputs.order.current
    shopSelect!.selectedIndex = 0;
    OrderSelect!.selectedIndex = 0;
    setCurrentPart(productNumber);
  } 
  useEffect(()=>{
    const Filters = {text:"", shop: "all", order: "nomeCrescente"}
    sortAndShow(Filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPart])

  async function search(){
    const shopSelect = inputs.shopp.current
    const OrderSelect = inputs.order.current
    const Filters = {
      text: inputs.text.current!.value,
      shop: shopSelect!.options[shopSelect!.selectedIndex].value,
      order: OrderSelect!.options[OrderSelect!.selectedIndex].value,
    }
    const items: any = {placadevideo:[],processador:[],promocoes:[]}
    const shops = Filters.shop == "all" ? ["kabum", "terabyte", "pichau"] : [Filters.shop]
    for(let shop of shops){
      switch (parts[currentPart]) {
        case "placadevideo":
          const amd: any = await searchItems("placadevideo", "placavideoamd", shop);
          const nvidea: any = await searchItems("placadevideo", "placavideonvidia", shop);
          console.log(localStorage.getItem("Items"))
          items["placadevideo"] = [...items["placadevideo"], ...amd, ...nvidea]
          localStorage.setItem("Items", JSON.stringify(items))
          break;
        case "processador":
          const processadorIntel: any = await searchItems("processador", "processadorintel", shop)
          const processadorAmd: any = await searchItems("processador", "processadoramd", shop)
          items["processador"] = [...processadorIntel, ...processadorAmd]
          localStorage.setItem("Items", JSON.stringify(items))
          break;
        case "promocoes":
          const promocoes: any = await searchItems("promocoes", "promocoes", shop)
          items["promocoes"] = [...promocoes]
          localStorage.setItem("Items", JSON.stringify(items))
          break;
        default:
          //error
          break;
      }
     
    }
    sortAndShow(Filters)
  }

  async function searchItems(part: string, product: string, shop: string){
    return new Promise(async (resolve) => {
      await fetch(`http://localhost:3333/${shop}/search/${product}`).then(res=>res.json()).then((json)=>{
        resolve(json)
      })
    })
  }

  function sortAndShow(Filters: {text: string, shop: string,order: string}){
    const items = localStorage.getItem("Items") ? JSON.parse(localStorage.getItem("Items")!) : {}
    let itemsForSort = items[parts[currentPart]]? items[parts[currentPart]] : []
    if(Filters.text != ""){
      const fuse = new Fuse(itemsForSort, options);
      const itemsFiltred = fuse.search(Filters.text);
      itemsForSort = itemsFiltred.map((item:any)=>item.item)
    }
    if(Filters.shop != "all"){
      itemsForSort = itemsForSort.filter((item: any) => item.loja == Filters.shop);
    }
    switch (Filters.order) {
      case "nomeCrescente":
        itemsForSort = itemsForSort.sort((a:any, b:any)=>{
          if (a.nome.replace(/í/g, 'i') < b.nome.replace(/í/g, 'i')) {
            return -1;
          }
          if (a.nome.replace(/í/g, 'i') > b.nome.replace(/í/g, 'i')) {
            return 1;
          }
          return 0;
        })
      break;
      case "nomeDecrescente":
        itemsForSort = itemsForSort.sort((a:any, b:any)=>{
          if (a.nome.replace(/í/g, 'i') < b.nome.replace(/í/g, 'i')) {
            return 1;
          }
          if (a.nome.replace(/í/g, 'i') > b.nome.replace(/í/g, 'i')) {
            return -1;
          }
          return 0;
        })
      break;
      case "precoCrescente":
        itemsForSort = itemsForSort.sort((a:any, b:any)=>{
          if (a.preco < b.preco) {
            return -1;
          }
          if (a.preco > b.preco) {
            return 1;
          }
          return 0;
        })
      break;
      case "precoDecrescente":
        itemsForSort = itemsForSort.sort((a:any, b:any)=>{
          if (a.preco < b.preco) {
            return 1;
          }
          if (a.preco > b.preco) {
            return -1;
          }
          return 0;
        })
      break;
    
      default:
        break;
    }
    
    setItems(itemsForSort)
  }

  return(
    <div className="w-screen h-screen flex justify-center overflow-hidden bg-zinc-800 ">
      <div id="container" className="sm:max-w-7xl w-full h-screen flex justify-start flex-col">
        <Header></Header>
        <Nav part={currentPart} handlePart={setPart}></Nav>
        <Search inputs={inputs} handleSearch={search}></Search>
        <Content Items={Items}></Content>
      </div>
      <Load isHidden={true}></Load>
    </div>
  )
}
