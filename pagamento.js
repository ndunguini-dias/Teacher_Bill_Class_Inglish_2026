function pagar(){

const cursoSel = curso.options[curso.selectedIndex];
const cursoNome = cursoSel.value;
const valor = cursoSel.dataset.valor;

if(!nome.value || !numero.value || !validade.value || !cvv.value){
 status.innerHTML = "Preencha todos os campos";
 return;
}

status.innerHTML = "Processando pagamento...";
status.style.color = "#38bdf8";

/* simulação de processamento */

setTimeout(()=>{

 status.innerHTML = "Pagamento aprovado ✅";
 status.style.color = "#22c55e";

 /* salvar pagamento */
 let pagamentos = JSON.parse(localStorage.getItem("pagamentos")) || [];

 pagamentos.push({
  curso: cursoNome,
  valor,
  data: new Date().toLocaleString()
 });

 localStorage.setItem("pagamentos",JSON.stringify(pagamentos));

 /* liberar curso */
 liberarCurso(cursoNome);

},2000);
}

function liberarCurso(nomeCurso){

let liberados = JSON.parse(localStorage.getItem("cursosLiberados")) || [];
liberados.push(nomeCurso);
localStorage.setItem("cursosLiberados",JSON.stringify(liberados));

setTimeout(()=>{
 alert("Curso liberado! Acesse o painel do aluno.");
 location.href="aluno.html";
},1200);

}
