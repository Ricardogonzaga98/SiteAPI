document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCadastro");
  const msg = document.getElementById("mensagem");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      msg.textContent = "Cadastro enviado com sucesso!";
      msg.style.color = "#b30000";
      form.reset();
    });
  }
});
