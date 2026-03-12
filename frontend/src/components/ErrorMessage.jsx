
import { Link } from "react-router-dom";

export default function ErrorMessage({ titulo, mensagem, textoLink= "Voltar", urlLink= "/"}) {
    return (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{titulo}</h2>
            {mensagem && <p className="text-gray-600 mb-6">{mensagem}</p>}

            {urlLink && (
                <Link to={urlLink} className="text-blue-600 font-semibold hover:underline">
                    &larr; {textoLink}
                </Link>
            )}
        </div>
    )
}