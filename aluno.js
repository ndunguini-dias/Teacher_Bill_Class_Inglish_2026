/* ===== USER ===== */

let user = JSON.parse(localStorage.getItem("user")) || {nome:"Aluno Demo"};
nomeAluno.innerText = user.nome;

/* ===== NAVEGAÇÃO ===== */

function abrir(id){
 document.querySelectorAll(".secao")
 .forEach(s=>s.classList.remove("ativa"));

 document.getElementById(id).classList.add("ativa");
}

/* ===== CURSOS ===== */

let cursos = [
 {nome:"Inglês Básico", aulas:10, progresso:0},
 {nome:"Conversação", aulas:8, progresso:0}
];

function renderCursos(){
 listaCursos.innerHTML="";
 cursos.forEach((c,i)=>{
  listaCursos.innerHTML += `
   <div class="curso">
   <h4>${c.nome}</h4>
   <p>Progresso: ${c.progresso}/${c.aulas}</p>
   <button onclick="abrir('aula')">Assistir</button>
   </div>`;
 });
}

function marcarConcluida(){
 cursos[0].progresso++;
 salvarProgresso();
 renderCursos();
 verificarCertificado();
}

/* ===== PROVA ===== */

let perguntas = [
 {p:"I ___ a student", r:"am"},
 {p:"She ___ English", r:"speaks"},
 {p:"They ___ happy", r:"are"}
];

function renderQuiz(){
 quiz.innerHTML="";
 perguntas.forEach((q,i)=>{
  quiz.innerHTML += `
  <p>${q.p}</p>
  <input id="q${i}">`;
 });
}

function corrigir(){
 let acertos=0;
 perguntas.forEach((q,i)=>{
  if(document.getElementById("q"+i).value.toLowerCase()==q.r)
    acertos++;
 });
 resultado.innerText = `Nota: ${acertos}/${perguntas.length}`;
}

/* ===== CHAT ===== */

function enviar(){
 let texto = msg.value;
 if(!texto) return;

 chatBox.innerHTML += `<div class="msgAluno">${texto}</div>`;
 msg.value="";

 setTimeout(()=>{
  chatBox.innerHTML += `<div class="msgProf">Recebido 👍</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
 },800);
}

/* ===== CERTIFICADO ===== 

function verificarCertificado(){
 let completo = cursos[0].progresso >= cursos[0].aulas;
 btnCert.disabled = !completo;
 if(!completo) btnCert.innerText="Complete o curso";
}
*/
function salvarProgresso(){
 localStorage.setItem("progressoAluno",JSON.stringify(cursos));
}

/* ===== INIT ===== */

renderCursos();
renderQuiz();
verificarCertificado();
