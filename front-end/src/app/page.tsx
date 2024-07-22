"use client"

import Header from "@/components/Header"
import Load from "@/components/Load"
import Nav from "@/components/Nav"
import Search from "@/components/Search"
import Content from "@/components/Content"



export default function Home() {

  return(
    <div className="w-screen h-screen flex justify-center overflow-hidden bg-zinc-800 ">
      <div id="container" className="max-w-4xl w-full h-screen flex justify-start flex-col">
        <Header></Header>
        <Nav></Nav>
        <Search></Search>
        <Content></Content>
      </div>
      <Load isHidden={true}></Load>
    </div>
  )
}
