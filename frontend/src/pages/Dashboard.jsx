import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Assim que o Dashboard carregar, ele vai buscar a lista de posts
    useEffect(() => {
        carregarPosts();
    }, []);

    async function carregarPosts(){ 
        try {
            const response = await api.get('/posts');
            // Guarda os posts no estado para o React desenhar na tela
            setPosts(response.data);
        } catch (error) {
            console.error("Erro ao buscar publicações: ", error);
        } finally {
            setLoading(false);
        }
    };

    // A função do Poder de Destruição
    const handleDelete = async (id) => {
        // confirmar antes...
        const confirmacao = window.confirm("Tem certeza que deseja excluir esta publicação? Essa ação não poderá ser refeita!");
        if(confirmacao) {
            try {
                // manda o cmomando delete para o back
                await api.delete(`/posts/${id}`);
                // atualiza a tela , agora sem o post remivido
                setPosts(posts.filter(post => post._id !== id))
            } catch (error) {
                console.error("Erro ao deleter: ", error);
                alert("Não foi possível excluir. Verifique sua conexão ou permissões.");
            }
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100 mt-8">

            {/* Cabeçalho do Painel */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-100 gap-4">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-gray-900">Meu Painel</h1>
                    <p className="text-gray-500 text-sm mt-1">Gerencie publicações do EduBlog</p>
                </div>

                {/* Botão criar post */}
                <Link
                    to="/new-post"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors whitespace-nowrap shadow-sm"
                >
                    + Nova Publicação
                </Link>
            </div>

            {/* Lista de publicações */}
            {loading ? (
                <div className="text-center py-10 text-gray-500">Carregando publicações...</div>
            ) : posts.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-600 mb-4">Você ainda não tem nenhuma publicação.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map((post)=> (
                        <div 
                            key={post._id} 
                            className="flex  flex-col sm:flex-row justify-between items-start sm:items-center p-5 border
                             border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-gray-50"
                        >

                            <div className="mb-4 sm:mb-0">
                                <h3 className="font-bold text-lg text-gray-900">{post.titulo}</h3>
                                <p className="text-sm text-gray-500 mt-1">Autor: {post.autor || 'Desconhecido'}</p>
                            </div>

                            {/* Botões de Ação */}
                            <div className="flex gap-3 w-full sm:w-auto">
                                <Link
                                    to={`/edit-post/${post._id}`}
                                    className="flex-1 sm:flex-none text-center px-4 py-2 bg-white border border-gray-300
                                     text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="flex-1 sm:flex-none text-center px-4 py-2 bg-red-50 text-red-600 border
                                    border-red-100 rounded-lg hover:text-white hover:bg-red-600 font-medium transition-colors"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

