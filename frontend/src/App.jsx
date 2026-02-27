import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/* No futuro, o nosso <Header /> vai entrar exatamente aqui! */}
      
      <main>
        {/* O <Outlet /> é o "buraco" onde o React Router vai encaixar 
            a Home, o Login, o Dashboard, dependendo da URL */}
        <Outlet /> 
      </main>
    </>
  )
}

export default App
