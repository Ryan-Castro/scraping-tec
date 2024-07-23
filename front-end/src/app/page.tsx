"use client"

import Header from "@/components/Header"
import Load from "@/components/Load"
import Nav from "@/components/Nav"
import Search from "@/components/Search"
import Content from "@/components/Content"
import { useRef, useState } from "react"
import moment from "moment"


export default function Home() {
  const parts = ["placadevideo", "processador", "armazenamento"]
  const [currentPart, setCurrentPart] = useState(0)
  const inputs = {
    text: useRef<HTMLInputElement>(null),
    shopp: useRef<HTMLSelectElement>(null),
    order: useRef<HTMLSelectElement>(null)
  }

  function setPart(productNumber: number){
    inputs.text.current!.value = ""
    setCurrentPart(productNumber)
  }

  function search(){
    const shopSelect = inputs.shopp.current
    const OrderSelect = inputs.order.current
    const Filters = {
      text: inputs.text.current?.value,
      shop: shopSelect?.options[shopSelect.selectedIndex].value,
      order: OrderSelect?.options[OrderSelect.selectedIndex].value,
    }
    const items = localStorage.getItem("Items") ? JSON.parse(localStorage.getItem("Items")!) : []
    if(items.length < 1 && items["date"] !== moment().format("DDMMYYYY")){
      
    }

    //organizar
  }

  return(
    <div className="w-screen h-screen flex justify-center overflow-hidden bg-zinc-700 ">
      <div id="container" className="max-w-4xl w-full h-screen flex justify-start flex-col bg-zinc-800">
        <Header></Header>
        <Nav part={currentPart} handlePart={setPart}></Nav>
        <Search inputs={inputs} handleSearch={search}></Search>
        <Content></Content>
      </div>
      <Load isHidden={true}></Load>
    </div>
  )
}
