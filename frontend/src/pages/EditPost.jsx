import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import Input from "../components/Input";
import { useFormAction } from "../hooks/useFormAction";

export default function EditPost() {
    // Pega o ID do post que vem na URL (ex: /edit-post/12345)
    const { id } = useParams();

    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [carregandoDados, setCarregandoDados] = useState(true);

    const {loading, setLoading, erro, setErro, navigate} = useFormAction();

    // Assim que a tela abre, busca os dados do post para preencher o formulário
    useEffect(() => {
        async function buscarPost() {
            try {
                const response = await api.get(`/posts/${id}`);
                // Preenche os "states" com os dados que vieram do banco
                setTitulo(response.data.titulo);
                setAutor(response.data.autor || '');
                setConteudo(response.data.conteudo);
            } catch (error) {
                console.error("Erro ao carregar publicação: ", error);
                setErro("Não foi possível carregar os dados desta publicação.")
            } finally {
                setCarregandoDados(false);
            }
        }
        buscarPost();
    }, [id]);

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        setErro('');
        setLoading(true);

        try {
            // Diferente do NewPost (que usa POST), aqui usamos PUT para atualizar!
            await api.put(`/posts/${id}`, { titulo, autor, conteudo });

            //Sucesso! Volta para o painel
            navigate('/dashboard');
        } catch (error) {
            console.error("Erro ao atualizar publicação: ", error);
            setErro(error.response?.data?.error || "Não foi possível atualizar. Verificar sua conexão!")
        } finally {
            setLoading(false)
        }
    };

    // Se ainda estiver buscando os dados no banco, mostra uma tela de espera
    if (carregandoDados){
        return <div className="text-center py-20 text-gray-500 mt-8">Carregando dados da publicação...</div>;
    }

    return (
        <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100 mt-8">
            <div className="flex  justify-between items-center mb-8 pb-6 border-b border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Editar Publicação</h1>
                    <p className="text-gray-500 text-sm mt-1">Corrija ou atualize o seu conteúdo</p>
                </div>

                <Link
                    to="/dashboard"
                    className="text-gray-500 hover:text-gray-800 font-mediuim mt-1"
                >
                    Cancelar
                </Link>
            </div>

            {erro && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
                    {erro}
                </div>
            )}

            <form onSubmit={handleUpdatePost} className="space-y-6">

                <Input
                    label="Título da Publicação"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />

                <Input
                    label="Autor (ou Fonte"
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    required
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Conteúdo
                    </label>
                    <textarea
                        value={conteudo}
                        onChange={(e)=> setConteudo(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none
                            bg-gray-50 focus:bg-white transition-colors h-90 resize-y"
                    />
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`text-white font-bold py-3 px-8 rounded-lf transition-colors
                            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? 'Salvando...' : 'Salvar alterações'}
                    </button>
                </div>
            </form>
        </div>
    )
}
