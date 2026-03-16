export default function Loading({mensagem = "carregando..."}){
    return(
        <div>
           {/* Um spinner simples animado em CSS usando Tailwind */}
           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div> 
           <p className="text-gray-500 font-medium">{mensagem}</p>
        </div>
    );
}