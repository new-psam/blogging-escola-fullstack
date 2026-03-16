import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-amarelo-fundo">
      <Header/>
      
      {/* O flex-grow faz esta área esticar e empurrar o rodapé lá para baixo */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* O <Outlet /> é o "buraco" onde o React Router vai encaixar 
            a Home, o Login, o Dashboard, dependendo da URL */}
        <Outlet /> 
      </main>
      <Footer/>
    </div>
  )
}


