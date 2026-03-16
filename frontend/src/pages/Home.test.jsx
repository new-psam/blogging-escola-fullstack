// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Precisamos disso porque a Home tem <Link>
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Home from './Home';
import { api } from '../services/api';

vi.mock('../services/api');

describe('Pagina Home', () => {
    it('deve renderizar o título e a barra de busca corretamente', async () => {
        // 2. Prepara a API falsa: "Quando a Home chamar o api.get, devolva uma lista vazia"
        api.get.mockResolvedValue({ data: [] });

        // 3. Renderiza a Home em um "navegador invisível" na memória do computador
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        // 4. AS ASSERÇÕES (O Teste de Verdade):
        // Procura na tela invisível se o título H1 existe
        expect(screen.getByText('Últimas Publicações')).toBeInTheDocument();

        // Procura se o campo de texto da busca existe através do placeholder dele
        expect(screen.getByPlaceholderText('Buscar por título ou conteúdo')).toBeInTheDocument();
    });
    
});