function exportarCertificados(){
 const cert = localStorage.getItem("certNumero");
 alert("Último certificado: " + cert);
}

function limparSistema(){
 if(confirm("Deseja limpar tudo?")){
  localStorage.clear();
  alert("Sistema limpo");
 }
}

/* ===== DADOS SIMULADOS ===== */

let cursos = JSON.parse(localStorage.getItem("cursos")) || [
 {nome:"Inglês Básico", aulas:20},
 {nome:"Conversação", aulas:15}
];

let alunos = [
 {nome:"Ana", telefone:"900111222", modulo:"Básico", progresso:"80%"},
 {nome:"Carlos", telefone:"900333444", modulo:"Intermédio", progresso:"40%"}
];

let professores = [
 {nome:"João", especialidade:"Gramática"},
 {nome:"Maria", especialidade:"Conversação"}
];

/* ===== NAVEGAÇÃO ===== */

function mostrarSecao(id){
 document.querySelectorAll(".secao")
 .forEach(s=>s.classList.remove("ativa"));

 document.getElementById(id).classList.add("ativa");
}

/* ===== DASHBOARD ===== */

function atualizarDashboard(){
 totalCursos.innerText = cursos.length;
 totalAlunos.innerText = alunos.length;
 totalProf.innerText = professores.length;
}

/* ===== CURSOS ===== */

function renderCursos(){
 listaCursos.innerHTML = "";

 cursos.forEach((c,i)=>{
   listaCursos.innerHTML += `
     <div class="curso">
       <h3>${c.nome}</h3>
       <p>${c.aulas} aulas</p>
       <button onclick="removerCurso(${i})">Excluir</button>
     </div>
   `;
 });
}

function abrirModalCurso(){
 modalCurso.style.display="flex";
}

function salvarCurso(){
 const nome = cursoNome.value;
 const aulas = cursoAulas.value;

 cursos.push({nome,aulas});
 localStorage.setItem("cursos",JSON.stringify(cursos));

 modalCurso.style.display="none";
 renderCursos();
 atualizarDashboard();
}

function removerCurso(i){
 cursos.splice(i,1);
 localStorage.setItem("cursos",JSON.stringify(cursos));
 renderCursos();
 atualizarDashboard();
}

/* ===== TABELAS ===== */

function renderAlunos(){
 tabelaAlunos.innerHTML = `
 <tr><th>Nome</th><th>Telefone</th><th>Módulo</th><th>Progresso</th></tr>
 `;

 alunos.forEach(a=>{
   tabelaAlunos.innerHTML += `
   <tr>
     <td>${a.nome}</td>
     <td>${a.telefone}</td>
     <td>${a.modulo}</td>
     <td>${a.progresso}</td>
   </tr>`;
 });
}

function renderProf(){
 tabelaProf.innerHTML = `
 <tr><th>Nome</th><th>Especialidade</th></tr>
 `;

 professores.forEach(p=>{
   tabelaProf.innerHTML += `
   <tr>
     <td>${p.nome}</td>
     <td>${p.especialidade}</td>
   </tr>`;
 });
 renderCursos();
renderAlunos();
renderProf();
atualizarDashboard();


function add(){
cursos.push(cursoNome.value);
localStorage.setItem("cursos",JSON.stringify(cursos));
render();
}

function render(){
lista.innerHTML=cursos.map(c=>`• ${c}`).join("<br>");
}

render();
}





/* =========================
   SLIDESHOW — página inicial
========================= */
document.addEventListener("DOMContentLoaded", ()=>{

  const slides = document.querySelectorAll(".hero-img");

  if(slides.length > 0){
    let current = 0;

    setInterval(()=>{
      slides.forEach((s,i)=>{
        s.style.opacity = (i === current ? 1 : 0);
      });
      current = (current + 1) % slides.length;
    }, 5000);
  }

});















