import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormAction } from "../hooks/useFormAction";
import { api } from "../services/api";
import Input from "../components/Input";

export default function NewPost() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [conteudo, setConteudo] = useState('');

    const { loading, setLoading, erro, setErro, navigate } = useFormAction();

    const handleCreatePost = async (e) => {
        e.preventDefault();
        setErro('');
        setLoading(true)

        try {
            await api.post('/posts', {titulo, autor, conteudo});
            navigate('/dashboard');
        } catch (error) {
            console.error("Erro ao criar publicação: ", error);
            setErro(error.response?.data?.error || 'Não foi possível publicar. Verifique se você esta logado.');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100 mt-8">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Nova Publicação</h1>
                    <p className="text-gray-500 text-sm mt-1">Escreva um contúdo incrível</p>
                </div>

                {/* Botão sutil para voltar sem salvar */}
                <Link
                    to='/dashboard'
                    className="text-gray-500 hover:text-gray-800 font-medium transition-colors"
                >
                    Cancelar
                </Link>
            </div>

            {erro && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                    {erro}
                </div>
            )}

            {/* Formulário */}
            <form onSubmit={handleCreatePost} className="space-y-6">
                <Input
                    label="Título da Publicação"
                    type="text"
                    placeholder="Escreva ou cole aqui o título da publicação"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />

                <Input
                    label="Autor (ou Fonte)"
                    type="text"
                    placeholder="Ex: Prof. Marcelo ou Albert Einstein (Postado por Prof. Marcelo)"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    required
                />

                {/* Textarea para o conteúdo (não usamos o Input normal porque precisamos de várias linhas) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Conteúdo
                    </label>
                    <textarea
                        placeholder="Escreva ou cole o texto completo aqui..."
                        value={conteudo}
                        onChange={(e) => setConteudo(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500
                        focus:outline-none bg-gray-200 focus:bg-white transition-colors h-64 resize-y"
                    />
                </div>

                {/* Rodapé do formulário com o botão de salvar alinhado à direita */}
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`text-white font-bold py-3 px-8 rounded-lg transition-colors
                            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? 'Publicando...' : 'Publicar Conteúdo'}
                    </button>
                </div>
            </form>
        </div>
    );
}
