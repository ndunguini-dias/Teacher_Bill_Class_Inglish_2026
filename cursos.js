

let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
let editIndex = null;

const grid = document.getElementById("gridCursos");

// renderizar
function render(){
  grid.innerHTML = "";

  const filtro = document.getElementById("pesquisa").value.toLowerCase();

  cursos
  .filter(c=>c.nome.toLowerCase().includes(filtro))
  .forEach((c,i)=>{

    grid.innerHTML += `
    <div class="card">
      <img src="${c.img || 'https://picsum.photos/400/200'}">
      <div class="card-body">
        <span class="badge ${c.nivel}">${c.nivel}</span>
        <h3>${c.nome}</h3>
        <p>${c.desc}</p>
        <div class="status">Status: ${c.status}</div>

        <div class="card-actions">
          <button onclick="editar(${i})">Editar</button>
          <button onclick="remover(${i})">Excluir</button>
        </div>
      </div>
    </div>
    `;
  });

  localStorage.setItem("cursos", JSON.stringify(cursos));
}

document.getElementById("pesquisa").oninput = render;

// modal
function abrirModal(){
  modal.style.display="flex";
}

function fecharModal(){
  modal.style.display="none";
  editIndex=null;
}

// salvar
function salvarCurso(){
  const nome = cursoNome.value;
  const nivel = cursoNivel.value;
  const desc = cursoDesc.value;
  const status = cursoStatus.value;

  const file = cursoImg.files[0];

  if(file){
    const reader = new FileReader();
    reader.onload = e=>{
      salvarObj(e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    salvarObj(null);
  }

  function salvarObj(img){
    const obj = {nome,nivel,desc,status,img};

    if(editIndex===null) cursos.push(obj);
    else cursos[editIndex]=obj;

    fecharModal();
    render();
  }
}

// editar
function editar(i){
  const c = cursos[i];
  cursoNome.value = c.nome;
  cursoNivel.value = c.nivel;
  cursoDesc.value = c.desc;
  cursoStatus.value = c.status;
  editIndex = i;
  abrirModal();
}

// remover
function remover(i){
  if(confirm("Remover curso?")){
    cursos.splice(i,1);
    render();
  }
}

// inicial
render();