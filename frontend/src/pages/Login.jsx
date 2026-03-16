import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Input from "../components/Input";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
    const [email , setEmail ] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { signIn } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro(''); // Limpa erros anteriores
        setLoading(true);

        try {
            // 1. Envia os dados para a rota de login do backend
            const response = await api.post('/auth/login', {email, senha });

            // 2. O backend respondeu com sucesso! Pegamos o token
            const { token, user } = response.data;

            // 3. Montamos os dados garantindo que o nome E a role (se existir) entrem no pacote
            const userData = { 
                nome: user?.nome || email.split('@')[0],
                role: user?.role // <-- AQUI ESTÁ A MÁGICA! Agora a role vai pro Contexto!
            };

            // 4. Salva no contexto e no navegador
            signIn(token, userData);
            
            //5. Ensinando o Axios a usar o token
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // 6. Navegação Inteligente: Professor vai pro Painel, Aluno vai pra Home
            if (userData.role === 'professor') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }

        } catch (error) {
            console.error("Erro no login:", error);
            // Se o backend mandar uma mensagem de erro específica (ex: "Senha inválida"), mostramos ela
            setErro(error.response?.data?.error || 'E-mail ou senha incorretos. tente novamente')
        } finally {
            setLoading(false);
        }
    }
    return (
        // AJUSTE DE LARGURA: Mudamos de max-w-md para max-w-2xl para ficar mais largo como no Figma.
        // AJUSTE MOBILE: O px-6 é para celular, sm:p-12 dá mais espaço no desktop
        <div className="w-full sm:min-w-[500px] lg:min-w-[600px] max-w-2xl mx-auto bg-white px-6 py-8 sm:p-12 
            rounded-2xl shadow-sm border border-gray-100 mt-12"
        >
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-gray-900">Faça seu Login</h2>
                <p className="text-sm text-gray-500 mt-2">Entre para comentar ou gerenciar suas publicações</p>
            </div>

            {/* Se houver algum erro, mostramos esta caixa vermelha */}
            {erro && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
                   {erro} 
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
                <Input
                    label="E-mail"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                />

                <Input
                    label="Senha"
                    type="password"
                    placeholder="sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-colors mt-2
                    ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            <div className="mt-4">
                <Link
                    to="/register"
                    className="text-sm text-blue-600 hove:text-blue-800 transition-colors"
                >
                    Não tem conta? Cadastre-se
                </Link>
            </div>
        </div>
    );
}