let button = document.querySelector("button");
// Seleciona o elemento 'button' na página e o armazena na variável 'button'.

let cod_escola = localStorage.getItem("cod_escola")

button.onclick = async function (event) {
  event.preventDefault();
  // Define um evento de clique para o botão. Quando o botão é clicado, a função é executada. 
  // 'event.preventDefault()' impede o comportamento padrão do botão, como enviar o formulário ou recarregar a página.

  let form = document.getElementById("forms_mural");
  let imagem = document.getElementById("imagem");
  let formData = new FormData(form);
  formData.append("cod_escola", cod_escola);
  formData.append("imagem", imagem);
  // Captura o formulário com o ID 'forms_mural' e cria um objeto 'FormData' com os dados do formulário, incluindo arquivos selecionados.

  const response = await fetch("http://localhost:3008/api/update/postimg", {
    method: "POST",
    body: formData,
  });
  // Envia uma solicitação POST para o endpoint '/api/update/postimg' com o corpo da requisição contendo o 'formData'. 
  // 'formData' permite que os dados do formulário, incluindo arquivos, sejam enviados corretamente.

  let content = await response.json();
  console.log(content);
  // Converte a resposta da requisição em JSON e a armazena em 'content'. Exibe o conteúdo da resposta no console.

  if (content.success) {
    alert("IMAGEM FOI!");
    // Se o upload da imagem foi bem-sucedido, exibe um alerta informando que a imagem foi enviada com sucesso.
  } else {
    console.error("ERRO ao mandar a imagem:", content.sql);
    alert("Selecione a imagem novamente");
    // Se houve um erro ao enviar a imagem, exibe um erro no console com os detalhes e um alerta pedindo para tentar novamente.
  }
};
