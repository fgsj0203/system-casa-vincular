document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    try {
        // Limpar erro anterior
        errorDiv.classList.add('d-none');

        // Fazer login
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Verificar tipo de usuário no Firestore
        const userDoc = await db.collection('usuarios').doc(user.uid).get();

        if (userDoc.exists) {
            const userData = userDoc.data();

            // Salvar dados no localStorage
            localStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                email: user.email,
                tipo: userData.tipo
            }));

            // Redirecionar para dashboard
            window.location.href = 'dashboard.html';
        } else {
            throw new Error('Usuário não encontrado no sistema');
        }

    } catch (error) {
        // Mostrar erro
        errorDiv.textContent = this.translateFirebaseError(error.message);
        errorDiv.classList.remove('d-none');
        console.error('Erro no login:', error);
    }
});

// Traduzir erros do Firebase
function translateFirebaseError(errorMessage) {
    const errors = {
        'auth/invalid-email': 'E-mail inválido',
        'auth/user-disabled': 'Usuário desativado',
        'auth/user-not-found': 'Usuário não encontrado',
        'auth/wrong-password': 'Senha incorreta',
        'auth/too-many-requests': 'Muitas tentativas. Tente mais tarde'
    };

    for (const [key, value] of Object.entries(errors)) {
        if (errorMessage.includes(key)) {
            return value;
        }
    }

    return 'Erro ao fazer login. Tente novamente.';
}

// Verificar se usuário já está logado
auth.onAuthStateChanged((user) => {
    if (user && window.location.pathname.includes('index.html')) {
        // Se já logado e na página de login, redirecionar
        window.location.href = 'dashboard.html';
    }
});