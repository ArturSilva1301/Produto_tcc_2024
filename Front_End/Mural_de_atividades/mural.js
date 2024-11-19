let button = document.querySelector("button");
// Seleciona o elemento 'button' na página e o armazena na variável 'button'.

let cod_escola = localStorage.getItem("cod_escola")

// Carregando as imagens 

const container_img = document.querySelector('.imagens');

async function buscandoImagens() {
  const response = await fetch(`http://localhost:3008/api/imagens/${cod_escola}`, {
    method: "GET"
  });

  let content = await response.json();

  if (content.success) {
    for (let i = 0; i < content.data.length; i++) {
      const img = document.createElement('img');
      img.src = `http://localhost:3008/uploads/${content.data[i].imagem}`;
      img.className = 'img_mural';

      container_img.appendChild(img);
    }
  }
  else {
    // alert('Erro ao carregar as imagens!')
    console.error();
  }
}

buscandoImagens();

// // Carregar as imagens

// const mural = document.querySelector('.mural_img');

// content.data.forEach(imagem => {
//   const mural_img = document.createElement('div');
//   mural_img.className = 'mural-card';

//   const img = document.createElement('img');
//   img.src = `http://localhost:3008/uploads/${mural_img}`; // Acesse 'imagem' diretamente no loop

//   mural_img.appendChild(img); // Adiciona a imagem ao div mural_img
//   mural.appendChild(mural_img); // Adiciona o div mural_img ao mural

//   console.log(mural)
// });

// Enviando imagem

button.onclick = async function () {
  const { value: file } = await Swal.fire({
    title: "Selecione a imagem para adicionar ao mural",
    input: "file",
    inputAttributes: {
      "accept": "image/*",
      "aria-label": "Upload your profile picture"
    }
  });
  if (file) {
    let formData = new FormData();
    formData.append("cod_escola", cod_escola);
    formData.append("imagem", file);

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
      window.location.reload();
    } else {
      console.error("ERRO ao mandar a imagem:", content);
      alert("Selecione a imagem novamente");
      // Se houve um erro ao enviar a imagem, exibe um erro no console com os detalhes e um alerta pedindo para tentar novamente.
    }
  }
}

// Selecionar os ícones
const settingsIcon = document.getElementById("settingsIcon");
const imagesIcon = document.getElementById("imagesIcon");

// Adicionar evento de clique para cada ícone
settingsIcon.addEventListener("click", function () {
    window.location.href = "../Perfil/perfil.html"; // Altere o caminho para a página desejada
});

imagesIcon.addEventListener("click", function () {
    window.location.href = "../Mural_de_atividades/mural.html"; // Altere o caminho para a página desejada
});