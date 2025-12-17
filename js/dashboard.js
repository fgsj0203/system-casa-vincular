// Verificar autenticação
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Carregar dados do usuário
    const userData = JSON.parse(localStorage.getItem('user'));

    // Atualizar interface
    document.getElementById('userEmail').textContent = userData.email;

    // Esconder link admin se não for admin
    if (userData.tipo !== 'admin') {
        document.getElementById('adminLink').classList.add('d-none');
    }

    // Carregar estatísticas
    carregarEstatisticas();
    carregarStatusServicos();
});

// Logout
function logout() {
    auth.signOut().then(() => {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });
}

// Carregar estatísticas do dia
async function carregarEstatisticas() {
    try {
        const hoje = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        const checkinsRef = db.collection('checkins');
        const query = checkinsRef.where('data', '==', hoje);
        const snapshot = await query.get();

        let totalCheckins = 0;
        let totalCafe = 0;
        let totalBanho = 0;
        let totalCorte = 0;

        snapshot.forEach(doc => {
            totalCheckins++;
            const data = doc.data();

            if (data.cafeManha) totalCafe++;
            if (data.banho) totalBanho++;
            if (data.corte) totalCorte++;
        });

        // Atualizar interface
        document.getElementById('totalCheckins').textContent = totalCheckins;
        document.getElementById('totalCafe').textContent = totalCafe;
        document.getElementById('totalBanho').textContent = totalBanho;
        document.getElementById('totalCorte').textContent = totalCorte;

    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
    }
}

// Carregar status dos serviços
async function carregarStatusServicos() {
    try {
        const configDoc = await db.collection('config').doc('servicos').get();

        if (configDoc.exists) {
            const servicos = configDoc.data().servicosAtivos;
            let html = '';

            if (servicos.cafeManha) html += '<p><i class="fas fa-check text-success"></i> Café da manhã</p>';
            else html += '<p><i class="fas fa-times text-danger"></i> Café da manhã</p>';

            if (servicos.banho) html += '<p><i class="fas fa-check text-success"></i> Banho</p>';
            else html += '<p><i class="fas fa-times text-danger"></i> Banho</p>';

            if (servicos.corte) html += '<p><i class="fas fa-check text-success"></i> Corte de cabelo</p>';
            else html += '<p><i class="fas fa-times text-danger"></i> Corte de cabelo</p>';

            document.getElementById('statusServicos').innerHTML = html;
        }
    } catch (error) {
        console.error('Erro ao carregar status:', error);
    }
}