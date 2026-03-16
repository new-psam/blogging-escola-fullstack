import { Link } from "react-router-dom";
import { formatarData } from "../utils/dateUtils";

export default function PostCard({ post }) {
    const dataFormatada = formatarData(post.dataCriacao);
   
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
            <h2 className="text-xl text-gray-800 font-bold mb-2">
                {post.titulo}
            </h2>

            <p className="text-xs text-gray-500 mb-4 font-medium">
                Por {post.autor} • {dataFormatada}
            </p>

            <p className="text-sm text-gray-600 mb-6 flex-grow">
                {post.conteudo.slice(0, 100)}...
            </p>

            <Link 
                to={`/post/${post._id}`}
                className="text-blue-600 text-sm font-semibold hover:underline mt-auto"
            >
                Ler publicação &rarr;
            </Link>
        </div>
    )
}