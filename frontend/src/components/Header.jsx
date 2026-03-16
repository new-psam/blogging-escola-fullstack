import  { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Header() {
    const navigate = useNavigate();
    const { user, isAuthenticated, signOut } = useContext(AuthContext);

    // 🕵️ TRUQUE PARA DEBUG: Abra o F12 (Console) do Chrome e veja o que tem dentro do usuário!
    console.log("Usuário logado:", user?.role);

    //função deslogar
    const handleLogout = () => {
        //1. joga a chave(token) fora
        signOut();
        //2. manda o usuário de volta para a Home
        navigate('/')
    };
    return (
        <header className='bg-white shadow-sm px-6 py-4'>
            <div className='max-w-5xl mx-auto flex justify-between items-center gap-2'>
                <Link to="/" className='text-xl font-bold text-blue-600 items-center gap-2'>
                    📚 FIVAM
                </Link>
                <nav className='flex items-center gap-6'>
                    {/* PAINEL: Só aparece se estiver logado E for professor */}
                    {isAuthenticated && user?.role === 'professor' &&(
                        <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">
                            Painel
                        </Link>
                    )}

                    {isAuthenticated ? (
                        //se logado... mostra o nome
                        <div className='flex items-center gap-6'>
                            {user && <span className='text-sm text-gray-500 hidden sm:block'>
                                Olá, <strong className="text-blue-600">{user?.nome}</strong>
                            </span>}
                            
                            
                            <button onClick={handleLogout} className='text-red-500 hover:text-red-700 font-medium transition-colors'>
                                Sair
                            </button>
                        </div>
                    ) : (
                        //se estiver deslogado...
                        <Link 
                            to="/login"
                            className='font-medium text-gray-600 hover:text-blue-600 transition-colors'>
                            Entrar
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    )
}