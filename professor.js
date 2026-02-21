const chatBox = document.getElementById("chatBox");
const msgInput = document.getElementById("msgInput");
const fileInput = document.getElementById("fileInput");

// Array de mensagens (simulação)
let mensagens = [
  {de:"aluno", tipo:"texto", conteudo:"Oi professor!"},
  {de:"professor", tipo:"texto", conteudo:"Oi, tudo bem?"}
];

// Função para renderizar mensagens
function renderMensagens(){
  chatBox.innerHTML = "";
  mensagens.forEach(msg=>{
    const div = document.createElement("div");
    div.classList.add("msg");
    div.classList.add(msg.de==="professor"?"msg-professor":"msg-aluno");

    // Verifica tipo
    if(msg.tipo==="texto"){
      div.innerText = msg.conteudo;
    } else if(msg.tipo==="imagem"){
      const img = document.createElement("img");
      img.src = msg.conteudo;
      img.style.maxWidth="200px";
      img.style.borderRadius="12px";
      div.appendChild(img);
    } else if(msg.tipo==="video"){
      const video = document.createElement("video");
      video.src = msg.conteudo;
      video.controls = true;
      video.style.maxWidth="250px";
      div.appendChild(video);
    } else if(msg.tipo==="audio"){
      const audio = document.createElement("audio");
      audio.src = msg.conteudo;
      audio.controls = true;
      div.appendChild(audio);
    } else if(msg.tipo==="pdf"){
      const link = document.createElement("a");
      link.href = msg.conteudo;
      link.target="_blank";
      link.innerText = "📄 PDF";
      div.appendChild(link);
    }

    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Enviar mensagem
function enviarMensagem(){
  const texto = msgInput.value.trim();
  if(texto){
    mensagens.push({de:"professor", tipo:"texto", conteudo:texto});
    renderMensagens();
    msgInput.value="";
  }

  // Verificar upload de arquivo
  const file = fileInput.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(e){
      let tipo = "imagem";
      if(file.type.includes("video")) tipo="video";
      else if(file.type.includes("audio")) tipo="audio";
      else if(file.type==="application/pdf") tipo="pdf";

      mensagens.push({de:"professor", tipo:tipo, conteudo:e.target.result});
      renderMensagens();
    };
    reader.readAsDataURL(file);
    fileInput.value="";
  }
}

// Inicializa chat
renderMensagens();
