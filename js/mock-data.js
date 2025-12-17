// js/mock-data.js
// Dados fictícios para todas as páginas

const MOCK_DATA = {
    usuarios: [
        { id: 1, email: 'admin@casavincular.com', tipo: 'admin', nome: 'Administrador' },
        { id: 2, email: 'voluntario@casavincular.com', tipo: 'voluntario', nome: 'Voluntário' }
    ],

    pessoas: [
        {
            id: 1,
            nome: "Maria Silva Santos",
            cpf: "123.456.789-00",
            genero: "feminino",
            situacao: "comunidade",
            faixaEtaria: "adulto",
            dataNascimento: "1985-03-15",
            telefone: "(11) 98765-4321",
            observacoes: "Alergia a lactose",
            dataCadastro: "2024-01-10T09:30:00",
            ultimaAtualizacao: "2024-01-15T08:30:00"
        },
        // ... mais pessoas
    ],

    checkins: [
        {
            id: 1,
            pessoaId: 1,
            data: "2024-01-15",
            hora: "08:30",
            cafeManha: true,
            banho: false,
            corte: false,
            numeroFicha: "",
            status: "finalizado"
        },
        // ... mais checkins
    ],

    config: {
        servicosAtivos: {
            cafeManha: true,
            banho: true,
            corte: true
        },
        ultimaAtualizacao: "2024-01-15T07:00:00"
    }
};

// Funções auxiliares
function getPessoaById(id) {
    return MOCK_DATA.pessoas.find(p => p.id === id);
}

function getCheckinsHoje() {
    const hoje = new Date().toISOString().split('T')[0];
    return MOCK_DATA.checkins.filter(c => c.data === hoje);
}

// Exportar para uso global
window.MOCK_DATA = MOCK_DATA;
window.getPessoaById = getPessoaById;
window.getCheckinsHoje = getCheckinsHoje;