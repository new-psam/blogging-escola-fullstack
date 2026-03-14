import PostCard from "../components/PostCard";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";


export default function Home() {
    // Estados para guardar os posts, o texto da busca e o status de carregamento
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // O useEffect roda uma vez assim que a tela abre, buscando os dados do backend
    useEffect(()=>{
        async function fetchPosts() {
            try {
              // Faz o GET na rota /posts do seu backend
              const response = await api.get('/posts');
              setPosts(response.data);
            } catch (error) {
                console.error("Erro ao buscar os posts:", error);
            }finally{
                setLoading(false); // Tira o aviso de carregamento, dando erro ou não
            }
        }
        fetchPosts();
    }, [])

    // Mágica do Filtro: cria uma nova lista apenas com os posts que batem com a busca
    const filteredPosts = posts.filter(post => {
        const term = searchTerm.toLowerCase();
        // Proteção: garante que os campos existem antes de tentar buscar
        const titleMatch = post.titulo?.toLowerCase().includes(term);
        const contentMatch = post.conteudo?.toLowerCase().includes(term);
        return titleMatch || contentMatch;

    });

    return (
        <div>

            {/* Cabeçalho da Home com a Barra de Busca */} 
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Últimas Publicações</h1>

                <div className="w-full md:w-72">
                    <input
                        type="text"
                        placeholder="Buscar por título ou conteúdo"
                        value={searchTerm}
                        onChange={(e)=> setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"    
                    />
                </div>
            </div>

            {/* Área de conteúdo: Mostra loading, mensagem de vazio ou o grid */}
            {loading ? (
                <Loading mensagem="Carregando publicações..."/>
            ):(
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post)=> (
                            <PostCard key={post._id} post={post}/>
                        ))
                    ):(
                        <ErrorMessage titulo="Nenhuma publicação encontrada" mensagem={ "Não achamos nada para `${searchTerm}`."} urlLink={null} />)
                    }
                </div>
            )}
            
        </div>
        
    )
}