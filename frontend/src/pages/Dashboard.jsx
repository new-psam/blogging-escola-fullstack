import { Link } from "react-router-dom"

export default function Dashboard() {
    return (
        <div className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100 mt-8">

            {/* Cabeçalho do Painel */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-100 gap-4">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-gray-900">Meu Painel</h1>
                    <p className="text-gray-500 text-sm mt-1">Gerencie publicações do EduBlog</p>
                </div>

                {/* Botão que amanhã vai nos levar para a tela de criar post */}
                <Link
                    to="/new-post"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors whitespace-nowrap shadow-sm"
                >
                    + Nova Publicação
                </Link>
            </div>

            {/* Área central provisória para celebrar a vitória de hoje */}
            <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <span className="text-4xl mb-4 block">🎉</span>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Sucesso Absoluto!</h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                    O seu sistema de autenticação esta funcionando perfeitamente. O token do professor está a salvo e protegido.
                </p>
                <p className="text-gray-500 text-sm mt-4 font-medium">
                    Amanhã nós damos vida a esse botão azul para publicarmos no banco de dados!
                </p>
            </div>

        </div>
    );
}

