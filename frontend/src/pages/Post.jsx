import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { formatarData } from "../utils/dateUtils";

export default function Post() {
    // Captura o ID da URL (ex: /post/65ecf3...)
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // 💬 DADOS FALSOS (Mock) de comentários para montarmos a tela
    const [comentarios, setComentarios] = useState([
        { id: 1, autor: "Profa. Ana", texto: "Excelente reflexão, Marcelo! Vai ajudar muito nossos alunos.", data: "09/03/2026" },
        { id: 2, autor: "Aluno João", texto: "Gostei muito do texto. Ansioso pelas próximas aulas.", data: "10/03/2026" }
    ]);
    const [novoComentario, setNovoComentario] = useState('');

    // Busca a publicação específica no banco de dados
    useEffect(()=>{
        async function fetchPost(){
            try {
                const response = await api.get(`/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("Erro ao buscar a publicação", error);
            }finally{
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);

    // Função "fake" apenas para o botão de comentar funcionar visualmente na tela
    const handleComentar = (e) => {
        e.preventDefault();
        if(!novoComentario.trim()) return;

        const comentarioNovo = {
            id: Date.now(),
            autor: "Visitante",
            texto: novoComentario,
            data: new Date()
        };

        setComentarios([...comentarios, comentarioNovo]);
        setNovoComentario('');
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
                <div className="prose max-w-none text-gray-700 leading-relaxed mb-8 whitespace-pre-wrap">
                    {post.conteudo}
                </div>
            </div>

            {/* Sessão de Comentários (com fundo amarelo claro para destacar) */}
            <section className="bg-amarelo-fundo p-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Comentários ({comentarios.length})</h3>

                {/* Formulário Fake de Comentário */}
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

                {/* Lista de Comentários */}
                <div className="space-y-4">
                    {comentarios.map(comentario => (
                        <div key={comentario.id} className="bg-white p-4 rounded-xl sahdow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-sm text-gray-800">{comentario.autor}</span>
                                <span className="text-xs text-gray-500">{formatarData(comentario.data)}</span>
                            </div>
                            <p className="text-gray-600 text-sm">{comentario.texto}</p>
                        </div>
                    ))}    
                </div>   
            </section>

        </article>
    );
}

