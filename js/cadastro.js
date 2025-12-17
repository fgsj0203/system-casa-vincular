document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Coletar dados do formulário
    const pessoa = {
        nome: document.getElementById('nome').value.trim(),
        cpf: document.getElementById('cpf').value.trim() || null,
        genero: document.getElementById('genero').value || null,
        situacao: document.getElementById('situacao').value || null,
        faixaEtaria: document.getElementById('faixaEtaria').value || null,
        observacoes: document.getElementById('observacoes').value.trim() || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        // Salvar no Firestore
        await db.collection('pessoas').add(pessoa);

        // Sucesso
        alert('Pessoa cadastrada com sucesso!');

        // Limpar formulário
        document.getElementById('cadastroForm').reset();

        // Opcional: redirecionar para busca
        // window.location.href = 'busca.html';

    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar pessoa. Tente novamente.');
    }
});

// Máscara para CPF
document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 9) {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
        value = value.replace(/^(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
        value = value.replace(/^(\d{3})(\d{1,3})/, '$1.$2');
    }

    e.target.value = value;
});