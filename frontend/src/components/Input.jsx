

export default function Input({label, type="text", ...props}){
    return(
        <div>
            {/* Se você passar um label, ele desenha. Se não, ele ignora. */}
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )} 

            {/* O Input já vem com todo o design padrão do nosso sistema */}
            <input
                type={type}
                className="w-full px-4 border border-gray-300 rounded-xl focus:ring-2
                focus:ring-blue-500 focus:outline-none bg-gray-200 focus:bg-white transition-colors"
                {...props}
            />
        </div>
       
    )
}