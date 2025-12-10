const API = "/api";

document.querySelector("#form-cadastro").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = e.target.nome.value;
  const email = e.target.email.value;

  const res = await fetch(`${API}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email }),
  });
  
  const json = await res.json();
  
  if (json.sucesso) {
    localStorage.setItem("usuario_id", json.usuario.id_usuario);
    alert("Usuário cadastrado! Seu ID foi salvo automaticamente.");
  } else {
    alert("Erro ao cadastrar usuário: " + json.erro);
  }
  });

document.querySelector("#form-feedback").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id_usuario = localStorage.getItem("usuario_id");
    if (!id_usuario) {
      return alert("Erro: Nenhum usuário cadastrado! Cadastre-se antes de enviar feedback.");
    }
    
  const jogo = e.target.jogo.value;
  const comentario = e.target.comentario.value;

  await fetch(`${API}/feedbacks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_usuario, jogo, comentario }),
  });

  alert("Feedback enviado!");
  e.target.reset();
  carregarFeedbacks();
});

async function carregarFeedbacks() {
  const res = await fetch(`${API}/feedbacks`);
  const feedbacks = await res.json();
  const ul = document.getElementById("feedbacks");
  ul.innerHTML = "";
  feedbacks.forEach((f) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${f.usuario || "Usuário"}</strong> sobre <em>${f.jogo}</em>: ${f.comentario}`;
    ul.appendChild(li);
  });
}

carregarFeedbacks();
