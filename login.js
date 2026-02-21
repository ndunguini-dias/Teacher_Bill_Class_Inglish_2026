function toggleForm() {
  const loginCard = document.querySelector('.login-card');
  const regCard = document.querySelector('.register-card');
  loginCard.classList.toggle('hidden');
  regCard.classList.toggle('hidden');
}

function saveUser(u) {
  localStorage.setItem('user', JSON.stringify(u));
}

function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}

// Cadastro com validação básica
function register() {
  const nome = document.getElementById('regNome').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const senha = document.getElementById('regSenha').value.trim();

  if (!nome || !email || !senha) return alert('Preencha todos os campos!');
  
  const u = { nome, email, senha, pontos: 0, progresso: 0 };
  saveUser(u);
  alert('Cadastro realizado com sucesso!');
  toggleForm();
}

// Login com validação básica
function login() {
  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value.trim();
  const u = getUser();

  if (!u) return alert('Cadastre-se primeiro!');
  if (email === u.email && senha === u.senha) {
    alert(`Bem-vindo, ${u.nome}!`);
    location.href = 'dashboard.html';
  } else {
    alert('Email ou senha incorretos!');
  }
}
