import PostCard from "../components/PostCard";

// Nossa lista de dados falsos para testar o visual da tela
const mockPosts = [
  {
    id: 1,
    title: "O Futuro do React",
    author: "Profa. Mariana",
    date: "15 Fev 2026",
    content: "Nesta aula, vamos entender como a componentização ajuda a escalar projetos grandes e organizar o código."
  },
  {
    id: 2,
    title: "O Futuro do React na Educação",
    author: "Profa. Mariana",
    date: "15 Fev 2026",
    content: "Nesta aula, vamos entender como a componentização ajuda a escalar projetos grandes e organizar o código."
  },
  {
    id: 3,
    title: "O Mercado de Ações",
    author: "Prof. Marcelino",
    date: "18 Fev 2026",
    content: "Nesta aula, vamos entender como funciona o mercado de ações e a mente dos investidores."
  }
];

function Home() {
    return (
    <div>
       {/* Cabeçalho da Home com a Barra de Busca */} 
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Últimas Publicações</h1>

            <div className="w-full md:w-72">
                <input
                    type="text"
                    placeholder="Buscar publicações..."
                    className="w-full px-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"    
                />
            </div>
        </div>

        {/* Grid Responsivo: 1 coluna no celular, 3 no desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPosts.map((post)=> (
                <PostCard key={post.id} post={post}/>
            ))}
        </div>
    </div>
        
    )
}

export default Home;