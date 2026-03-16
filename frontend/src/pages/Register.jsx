import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import Input from "../components/Input";
import { useFormAction } from "../hooks/useFormAction";

export default function Register(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [role, setRole] = useState('aluno')

    const { loading, setLoading, erro, setErro, navigate } = useFormAction();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErro('');
        setLoading(true);

        try {
            await api.post('/auth/register', {nome, email, senha, role});
            navigate('/login');
        } catch (error) {
            console.error("Erro no cadastro:", error);
            setErro(error.response?.data?.error || 'Erro ao criar conta. Tente com outro e-mail.');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="w-full sm:min-w-[500] lg:min-w-[600px] max-w-2xl mx-auto bg-white px-6 py-8 sm:p-12 rounded-2xl
            shadow-sm border border-gray-100 mt-12"
        >
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-gray-900">Criar Conta</h2>
                <p className="text-sm text-gray-500 mt-2">Junte-se ao EduBlog</p>
            </div>

            {erro && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
                    {erro}
                </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6">
                <Input
                    label="Nome Completo"
                    type="text"
                    placeholder="Seu Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <Input
                    label="E-mail"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    label="Senha"
                    type="password"
                    placeholder="Crie uma senha forte"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Eu sou:
                    </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-3 border boder-gray-300  rounded-xl focus:ring-2 focus:ring-blue-500
                        bg-gray-200 focus:bg-white transition-colors "
                    >
                        <option value="aluno">Aluno</option>
                        <option value="professor">Professor</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-colors mt-2
                    ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>

                <div className="mt-4 text-center">
                        <Link
                            to="/login"
                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            Já tem uma conta? entre aqui
                        </Link>
                </div>
            </form>
        </div>
        
    )
}