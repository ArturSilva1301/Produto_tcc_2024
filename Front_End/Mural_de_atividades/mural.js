// Seleciona o elemento 'button' na página e o armazena na variável 'button'.
let button = document.querySelector(".img_mural");
let aba_img_fav = document.getElementById("imagemfavIcon");

let idUser = localStorage.getItem("idUser");
let tipo_usuario = localStorage.getItem("tipo_usuario");
let cod_escola = localStorage.getItem("cod_escola");

if (tipo_usuario === 'responsavel') {
  button.style.display = 'none';
} else {
  aba_img_fav.style.display = 'none';
}

// Carregando as imagens 

const container_img = document.querySelector('.imagens');

async function buscandoImagens() {
  // Busca as imagens dentro do banco de dados da escola do usuário
  const response = await fetch(`http://localhost:3008/api/imagens/${cod_escola}`, {
    method: "GET"
  });

  // Busca as imagens favoritadas pelo usuário
  const responseFavoritos = await fetch(`http://localhost:3008/api/imagens/favoritos/${idUser}`, {
    method: "GET"
  });

  // Retorno da consulta de todas as imagens armazenadas no banco
  const content = await response.json();

  // Retorno da consulta das imagens favortidas pelo usuário armazenadas no banco
  const favoritos = await responseFavoritos.json();

  // Lista dos ID das imagens favoritadas
  const listaFavoritos = [];

  // Preencher a lista de favoritos
  favoritos.data.forEach((a) => {
    listaFavoritos.push(a.id_img); // Armazena as imagens que foram favoritadas pelo usuário para realizar a comparação com aquelas que não foram favoritadas
  });

  if (content.success && content.data.length !== 0) {
    for (let i = 0; i < content.data.length; i++) {
      // Verifique se a imagem está na lista de favoritos
      const isFavorito = listaFavoritos.includes(content.data[i].id);

      if (tipo_usuario) {
        if (tipo_usuario === "escola") {
          container_img.innerHTML += `
          <div class="container_img">
            <img src="http://localhost:3008/uploads/${content.data[i].imagem}" data-id="${content.data[i].id}" data-img="${content.data[i].imagem}" class="foto_mural">
          </div>
        `;
        } else {
          container_img.innerHTML += `
          <div class="container_img">
            <img src="http://localhost:3008/uploads/${content.data[i].imagem}" data-id="${content.data[i].id}" data-img="${content.data[i].imagem}" class="foto_mural">
            <button class="botao_favoritar">
              <i class="bi ${isFavorito ? 'bi-star-fill' : 'bi-star'}"></i>
            </button>
          </div>
        `;
        }
      } else {
        // Se não encontrar a variável do localStorage 'tipo_usuário'
        Swal.fire({
          title: "Realize o login!",
          icon: "warning",
          showConfirmButton: false,
          timer: 2000
      });
        window.location.hreg = '../home/home.html';
      }
    }

    // Adiciona os eventos aos botões após carregar as imagens
    const botoesFavoritar = document.querySelectorAll('.botao_favoritar');
    botoesFavoritar.forEach(botao => {
      botao.addEventListener('click', async (e) => {
        e.preventDefault();

        // Busca a tag i (icon estrela)
        const icon = botao.querySelector('i');

        // Busca a div 'containerImg'
        const containerImg = botao.closest('.container_img');

        // Busca imagem dentro da div 'containerImg'
        const img = containerImg.querySelector('img');

        // Realiza a busca dos dados que foram armazenados dentro da tag img
        const imgId = img.dataset.id; // id da imagem
        const imgMural = img.dataset.img; // nome da imagem

        // Verificação se a imagem já foi favoritada
        if (icon.className === 'bi bi-star') {
          const data = { img_mural: imgMural, idUser, cod_escola };
          
          // Favorita a imagem
          const response = await fetch(`http://localhost:3008/api/imagens/favorita`, {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
          });

          let content = await response.json();

          if (content.success) {
            // Ao armazenar com sucesso a imagem favoritada dentro do banco de dados, a estrela é preechida no frontend
            icon.className = 'bi bi-star-fill';

            Swal.fire({
              title: "Imagem adicionada a aba de favoritos!",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
          });

          }
        } else {
          // Remove a imagem dos favoritos
          const response = await fetch(`http://localhost:3008/api/imagens/favorita/deletando`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify({ id_img_mural: imgId })
          });

          let content = await response.json();

          if (content.success) {
            // Ao remover com sucesso a imagem favoritada dentro do banco de dados, a estrela fica vazia no frontend
            icon.className = 'bi bi-star';

            Swal.fire({
              title: "Imagem removida da aba de favoritos!",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
          });
          }
        }
      });
    });
  } else {
    Swal.fire({
      title: "Erro ao carregar as imagens!",
      icon: "warning",
      showConfirmButton: false,
      timer: 2000
  });
    console.error();
  }
}

buscandoImagens();

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

      Swal.fire({
        title: "Imagem adicionada ao mural!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000
    });

      // Se o upload da imagem foi bem-sucedido, exibe um alerta informando que a imagem foi enviada com sucesso.
      window.location.reload();
    } else {
      console.error("ERRO ao mandar a imagem:", content);

      Swal.fire({
        title: "Selecione a imagem novamente!",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000
    });

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

imagemfavIcon.addEventListener("click", function () {
  window.location.href = "../Favoritos/favoritos.html"; // Altere o caminho para a página desejada
});