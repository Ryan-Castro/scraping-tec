import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col justify-between bg-zinc-900">
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
          <div id="bodyViewer">
            <div className="h-full w-1/4 bg-zinc-700">
              <ul className="text-zinc-200 text-xl">
                <li className="p-4 bg-zinc-400">Placa de vídeo</li>
                <li className="p-4">Placa de Processadores</li>
                <li className="p-4">Placa de Promoções</li>
              </ul>
            </div>
            <div></div>
          </div>
        </div>
      </section>
    </main>
  );
}
