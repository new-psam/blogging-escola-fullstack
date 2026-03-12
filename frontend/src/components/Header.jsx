import  { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation(); // Ajuda o Header a se atualizar quando a página muda

    // Verifica se o token existe no armazenamento do navegador
    const isAuthenticated = !!localStorage.getItem('@EduBlog:token');

    //função deslogar
    const handleLogout = () => {
        //1. joga a chave(token) fora
        localStorage.removeItem('@EduBlog:token');
        //2. manda o usuário de volta para a Home
        navigate('/')
    };
    return (
        <header className='bg-white shadow-sm px-6 py-4'>
            <div className='max-w-5xl mx-auto flex justify-between items-center gap-2'>
                <Link to="/" className='text-xl font-bold text-blue-600 items-center gap-2'>
                    📚 EduBlog
                </Link>
                <nav>
                    {isAuthenticated ? (
                        //se logado...
                        <div className='flex items-center gap-6'>
                            <Link to="/dashboard" className='text-gray-600 hover:text-blue-600 font-medium transition-colors'>
                                Painel
                            </Link>
                            <button onClick={handleLogout} className='text-red-500 hover:text-red-700 font-medium transition-colors'>
                                Sair
                            </button>
                        </div>
                    ) : (
                        //se estiver deslogado...
                        <Link 
                            to="/login"
                            className='font-medium text-gray-600 hover:text-blue-600 transition-colors'>
                            Entrar como Professor/a
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    )
}