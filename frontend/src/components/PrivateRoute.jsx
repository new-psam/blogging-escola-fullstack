import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    // O guarda verifica se o Token existe no cofre
    const isAuthenticated = !!localStorage.getItem('@EduBlog:token');

    // Se tem o token, ele libera a catraca (Outlet renderiza a página filha)
    // Se não tem, ele manda direto pro Login e apaga o histórico (replace)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}