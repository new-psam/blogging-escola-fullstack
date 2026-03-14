import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useFormAction() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    return {
        loading,
        setLoading,
        erro,
        setErro,
        navigate
    };
}