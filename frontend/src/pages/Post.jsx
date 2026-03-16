import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { formatarData } from "../utils/dateUtils";
import { AuthContext } from "../contexts/AuthContext";

export default function Post() {
    // Captura o ID da URL (ex: /post/65ecf3...)
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [novoComentario, setNovoComentario] = useState('');

    //Contexto: sabemos se está logado e quem é o usuário!
    const { isAuthenticated, user } = useContext(AuthContext);

    // Busca a publicação específica no banco de dados
    useEffect(()=>{
        async function fetchPostAndComments(){
            try {
                const [resPost, resComentarios] = await Promise.all([
                    api.get(`/posts/${id}`),
                    api.get(`/posts/${id}/comments`)
                ]);

                setPost(resPost.data);
                setComentarios(resComentarios.data)
            } catch (error) {
                console.error("Erro ao buscar dados", error);
            }finally{
                setLoading(false);
            }
        }
        fetchPostAndComments();
    }, [id]);

    
    const handleComentar = async (e) => {
        e.preventDefault();
        if(!novoComentario.trim()) return;

        try {
            //Não precisamos passar o Token aqui porque 
            // o seu AuthContext já ensinou o Axios a mandar ele automaticamente!
            const response = await api.post(`/posts/${id}/comments`, {
                texto: novoComentario,
                // Pega o nome real do usuário logado (com fallback de segurança)
                autor: user?.nome || 'Aluno Logado'
            });
            setComentarios([response.data, ...comentarios]);
            setNovoComentario('');
        } catch (error) {
            console.error("Erro ao publicar comentário", error);
            alert("Erro ao enviar o comentário. Sua sessão pode ter expirado.");
        }

    };

    //1. Tela de Carregamento
    if(loading) return <Loading mensagem="Carregando a publicação..."/>
    //2. tela de erro
    if (!post) return <ErrorMessage titulo="Publicação não encontrada" textoLink="Voltar para a Home" />
    // data formatada
    const dataBonita = formatarData(post.dataCriacao);


    return (
        <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Corpo principal do post */}
            <div className="p-8">
                <Link to="/" className="text-blue-600 text-sm font-semibold hover:underline mb-8 inline-block">
                    &larr; Voltar para as publicações
                </Link>

                <header className="mb-8 border-b border-gray-100 pb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {post.titulo}
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Por <span className="text-gray-800">{post.autor}</span> • {dataBonita}
                    </p>
                </header>

                {/* O whitespace-pre-wrap garante que as quebras de linha que o autor digitou sejam respeitadas na tela */}
                <div className="prose max-w-none text-gray-700 leading-relaxed mb-8 whitespace-pre-wrap text-justify">
                    {post.conteudo}
                </div>
            </div>

            {/* Sessão de Comentários */}
            <section className="bg-amarelo-fundo p-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Comentários ({comentarios.length})</h3>

                {/* Renderização Condicional baseada no Contexto */}
                {isAuthenticated ? (
                    <form onSubmit={handleComentar} className="mb-8">
                        <textarea
                            value={novoComentario}
                            onChange={(e)=> setNovoComentario(e.target.value)}
                            placeholder="O que você achou dessa publicação?"
                            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none h-24 mb-3"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Comentar
                        </button>
                    </form>

                ) : (
                    <div className="mb-8 p-5 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="font-medium text-sm md:text-base">
                            Você precisa estar logado para deixar um comentário.
                        </p>
                        <div className="flex gap-3">
                            <Link to="/login" className="px-4 py-2 bg-white border border-blue-300 rounded text-blue-700 font-semibold hover:bg-blue-100
                             transition-colors">
                                Fazer Login
                            </Link>
                            <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors">
                                Cadastrar
                            </Link>
                        </div>
                    </div>   
                )}

                {/* Lista de Comentários */}
                <div className="space-y-4">

                    {comentarios.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">Seja o primeiro a comentar!</p>
                    ) : (
                        comentarios.map(comentario => (
                            <div key={comentario._id} className="bg-white p-4 rounded-xl sahdow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-sm text-gray-800">{comentario.autor}</span>
                                    <span className="text-xs text-gray-500">{formatarData(comentario.dataCriacao)}</span>
                                </div>
                                <p className="text-gray-600 text-sm">{comentario.texto}</p>
                            </div>
                        ))    
                    )} 
   
                </div>


            </section>

        </article>
    );
}

