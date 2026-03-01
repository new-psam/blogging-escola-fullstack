export default function() {
    const anoAtual = new Date().getFullYear();

    return(
        <footer className="bg-white border-t border-gray-200 py-6 mt-8">
            <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-500">
                <p>© {anoAtual} EduBlog. Todos os direitos reservados.</p>
                <p className="mt-1">
                    Desenvolvido com ❤️ para transformar a educação!
                </p>
            </div>
        </footer>
    )
}