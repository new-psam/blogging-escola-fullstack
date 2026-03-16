// @vitest-environment jsdom

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import '@testing-library/jest-dom/vitest'

import Dashboard from './Dashboard';
import { api } from "../services/api";
// Precisamos importar o Contexto para "fingir" o login
import { AuthContext } from "../contexts/AuthContext";

vi.mock('../services/api');

describe('Página Dashboard', () => {
    // Criamos um post falso e um usuário falso para o teste
    const mockPosts = [
        {_id: '123', titulo: 'Post Teste', autor: 'Prof Teste'}
    ];

    const mockAuthValue = {
        isAuthenticated: true,
        user: { role: 'professor', nome: 'Prof Teste' }
    };

    // O beforeEach roda antes do teste começar. Ele "zera" a memória do Vitest.
    beforeEach(() => {
        vi.clearAllMocks();
        // Mágica: Falsifica o alerta do navegador e faz ele clicar em "OK" (true) sozinho!
        window.confirm = vi.fn(() => true);
    });

    it('deve chamar a api.delete com o ID correto ao clicar em Excluir', async () => {
        // Prepara a API falsa
        api.get.mockResolvedValue({ data: mockPosts});
        api.delete.mockResolvedValue({}); // O delete não devolve nada, só sucesso

        // Renderiza o Dashboard "envelopado" com o nosso usuário falso logado
        render(
            <AuthContext.Provider value={mockAuthValue}>
                <BrowserRouter>
                    <Dashboard />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        // Espera o React ler a API e desenhar o post na tela (por isso o findByText e o await)
        const tituloPost = await screen.findByText('Post Teste');
        expect(tituloPost).toBeInTheDocument();

        // Encontra o botão de excluir e simula o clique do mouse!
        const botaoExcluir = screen.getByText('Excluir');
        fireEvent.click(botaoExcluir);

        // AS ASSERÇÕES DE OURO: 
        // 1. Verifica se a caixinha de confirmação apareceu
        expect(window.confirm).toHaveBeenCalled();

        // 2. Verifica se o Axios mandou o comando DELETE com o ID '123'
        await waitFor(() => {
            expect(api.delete).toHaveBeenCalledWith('/posts/123');
        });
    });

});

