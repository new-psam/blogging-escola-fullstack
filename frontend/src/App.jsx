import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      
      {/* O flex-grow faz esta área esticar e empurrar o rodapé lá para baixo */}
      <main className="flex-grow max-w-5xl mx-auto p-6">
        {/* O <Outlet /> é o "buraco" onde o React Router vai encaixar 
            a Home, o Login, o Dashboard, dependendo da URL */}
        <Outlet /> 
      </main>
      <Footer/>
    </div>
  )
}

export default App
