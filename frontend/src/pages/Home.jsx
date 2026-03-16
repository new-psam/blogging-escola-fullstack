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
            setLoading(true);
            try {
              // Se o usuário digitou algo, usa a rota de busca. Se estiver vazio, lista todos!
              const rota = searchTerm ? `/posts/search?q=${searchTerm}` : '/posts';
              const response = await api.get(rota);

              setPosts(response.data);
            } catch (error) {
                console.error("Erro ao buscar os posts:", error);
            }finally{
                setLoading(false); // Tira o aviso de carregamento, dando erro ou não
            }
        }

        // Espera o usuário parar de digitar por 500ms antes de chamar a API.
        // Isso evita que o seu front-end "metralhe" o banco de dados a cada letra digitada!
        const delayDebounce = setTimeout(() => {
            fetchPosts();
        }, 500);

        // Limpa o tempo se o usuário voltar a digitar antes de meio segundo
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]); // Array de dependências: roda o useEffect quando o searchTerm mudar.


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
                    {posts.length > 0 ? (
                        posts.map((post)=> (
                            <PostCard key={post._id} post={post}/>
                        ))
                    ):(
                        <ErrorMessage titulo="Nenhuma publicação encontrada" mensagem={ `Não achamos nada para "${searchTerm}".`} urlLink={null} />)
                    }
                </div>
            )}
            
        </div>
        
    )
}