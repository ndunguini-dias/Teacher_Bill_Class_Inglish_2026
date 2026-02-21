// Slideshow
const slides=[document.getElementById("slide1"),document.getElementById("slide2"),document.getElementById("slide3")];
let current=0;
setInterval(()=>{
  slides.forEach((s,i)=>s.style.opacity=(i===current?1:0));
  current=(current+1)%slides.length;
},5000);

// Login / Cadastro
function mostrarCadastro(){document.getElementById('loginBox').classList.add('hidden');document.getElementById('cadastroBox').classList.remove('hidden')}
function mostrarLogin(){document.getElementById('cadastroBox').classList.add('hidden');document.getElementById('loginBox').classList.remove('hidden')}
function saveUser(u){localStorage.setItem("user",JSON.stringify(u))}
function getUser(){return JSON.parse(localStorage.getItem("user"))}

function fazerCadastro(){
  const payload={nome:nome.value.trim(),apelido:apelido.value.trim(),nascimento:nascimento.value,telefone:telefone.value.trim(),endereco:endereco.value.trim(),senha:senhaCadastro.value};
  if(!payload.nome||!payload.apelido||!payload.nascimento||!payload.telefone||!payload.endereco||!payload.senha){cadMsg.innerHTML="Preencha todos os campos!";return;}
  saveUser(payload);cadMsg.innerHTML="Conta criada com sucesso!";setTimeout(mostrarLogin,1500);
}

function fazerLogin(){
  const user=getUser();
  if(!user){loginMsg.innerHTML="Cadastre-se primeiro!";return;}
  if(loginUser.value.trim()===user.nome || loginUser.value.trim()===user.telefone || loginUser.value.trim()===user.endereco){
    if(loginSenha.value===user.senha){loginMsg.innerHTML="Login OK — redirecionando...";setTimeout(()=>location.href="dashboard.html",800)}
    else loginMsg.innerHTML="Senha incorreta!";
  }else loginMsg.innerHTML="Usuário não encontrado!";
}

// Pesquisa
function pesquisar(){
  const termo=document.getElementById("pesquisa").value.toLowerCase();
  let r="";
  Object.values(cursos).flat().forEach(a=>{if(a.titulo.toLowerCase().includes(termo) || a.texto.toLowerCase().includes(termo)) r+=`<div class='card'>${a.titulo}</div>`});
  document.getElementById("resultadoPesquisa").innerHTML=r||"Nada encontrado";
}

// Módulos e quizzes
const cursosFinal = {
  basico:[{titulo:"Greetings",texto:"Hello = Olá",quiz:{p:"Como se diz 'Olá' em inglês?",op:["Hello","Bye","Night"],c:0}}],
  intermedio:[{titulo:"Past",texto:"I worked",quiz:{p:"Escolha a forma correta do passado de 'go'",op:["went","goed","go"],c:0}}],
  avancado:[{titulo:"Conditional",texto:"If I had...",quiz:{p:"Qual estrutura condicional correta?",op:["past+would","future","present"],c:0}}]
};
let aulaAtual=0;let moduloAtual=null;
function abrirModulo(mod){moduloAtual=mod;aulaAtual=0;carregarAula();location.href="aula.html";}
function carregarAula(){
  const aula=cursosFinal[moduloAtual][aulaAtual];if(!aula)return alert("Não há mais aulas neste módulo.");
  document.getElementById("tituloAula").innerText=aula.titulo;
  document.getElementById("textoAula").innerText=aula.texto;
  const quiz=aula.quiz;const opcoesDiv=document.getElementById("opcoesQuiz");opcoesDiv.innerHTML="";
  quiz.op.forEach((o,i)=>{const btn=document.createElement("button");btn.className="btn";btn.innerText=o;btn.onclick=()=>verificarResposta(i,quiz.c);opcoesDiv.appendChild(btn)});
  document.getElementById("resultadoQuiz").innerText="";
}
function verificarResposta(selected,correto){document.getElementById("resultadoQuiz").innerText=(selected===correto?"✔ Correto!":"❌ Incorreto!");}
function proximaPergunta(){aulaAtual++;if(aulaAtual>=cursosFinal[moduloAtual].length){alert("Você concluiu o módulo! Parabéns!");location.href="certificado.html";}else carregarAula();}
