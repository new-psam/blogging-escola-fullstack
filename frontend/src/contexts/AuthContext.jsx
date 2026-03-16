import { createContext, useState, useEffect } from "react";
import { api } from "../services/api";

// 1. Criamos o Contexto (a nuvem de dados)
export const AuthContext = createContext({});

// 2. Criamos o Provedor (quem vai abraçar o app e distribuir os dados)
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Assim que o site abre, ele olha se já tinha alguém salvo de ontem
    useEffect(()=>{
        const token = localStorage.getItem('@EduBlog:token');
        const storedUser = localStorage.getItem('@EduBlog:user');

        if (token && storedUser) {
            //Se achou o token salvo, já injeta no Axios para uso em todo o site!
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Nova função centralizada de Login
    const signIn = (token, userData) => {
        localStorage.setItem('@EduBlog:token', token);
        localStorage.setItem('@EduBlog:user', JSON.stringify(userData));

        //Injeta o token no Axios assim que o usuário faz o login!
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser(userData);
    };

    // Nova função centralizada de Logout
    const signOut = () => {
        localStorage.removeItem('@EduBlog:token');
        localStorage.removeItem('@EduBlog:user');

        // Remove o token do Axios quando o usuário sai, por segurança!
        api.defaults.headers.common['Authorization'] = undefined;

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}