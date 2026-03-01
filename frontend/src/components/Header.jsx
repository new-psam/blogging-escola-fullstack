import  { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className='bg-white shadow-sm px-6 py-4'>
            <div className='max-w-5xl mx-auto flex justify-between items-center gap-2'>
                <Link to="/" >
                    📚 EduBlog
                </Link>
                <nav>
                    <Link 
                        to="/login"
                        className='text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors'>
                        Entrar como Professor/a
                    </Link>
                </nav>
            </div>
        </header>
    )
}