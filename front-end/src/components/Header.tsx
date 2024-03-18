export default function Header() {
    return (
    <header className="w-screen flex justify-between items-center p-3 bg-zinc-950 text-white">
        <h1 className="text-3xl">Logo</h1>
        <nav>
        <ul className="flex gap-10">
            <li>Sobre</li>
            <li>Contato</li>
        </ul>
        </nav>
    </header>
    );
  }
  