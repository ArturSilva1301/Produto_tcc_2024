// Buscando os dados dentro do LocalStorage

let idUser = localStorage.getItem("idUser");
let cod_escola = localStorage.getItem("cod_escola");

// Carregando as imagens favoritadas

const container_img = document.querySelector('.imagens');

async function buscandoImgFav() {
    // Busca as imagens dentro do banco de dados
    const response = await fetch(`http://localhost:3008/api/imagens/${cod_escola}`, {
        method: "GET"
    });

    // Busca as imagens favoritadas pelo usuário
    const responseFavoritos = await fetch(`http://localhost:3008/api/imagens/favoritos/${idUser}`, {
        method: "GET"
    });

    const content = await response.json();
    const favoritos = await responseFavoritos.json();

    const listaFavoritos = [];

    // Preencher a lista de favoritos
    favoritos.data.forEach((a) => {
        listaFavoritos.push(a.id_img); // Armazena as imagens que foram favoritadas pelo usuário para realizar a comparação com aquelas que não foram favoritadas
    });


    if (content.success) {
        for (let i = 0; i < content.data.length; i++) {
            const isFavorito = listaFavoritos.includes(content.data[i].id);

            if (isFavorito) {
                container_img.innerHTML += `
                    <div class="container_img">
                    <img src="http://localhost:3008/uploads/${content.data[i].imagem}" data-id="${content.data[i].id}" data-img="${content.data[i].imagem}" class="foto_mural">
                    <button class="botao_favoritar">
                        <i class="bi ${isFavorito ? 'bi-star-fill' : 'bi-star'}"></i>
                    </button>
                    </div>
                `;
            }
        }

        const botoesFavoritar = document.querySelectorAll('.botao_favoritar');
        botoesFavoritar.forEach(botao => {
            botao.addEventListener('click', async (e) => {
                e.preventDefault();

                const icon = botao.querySelector('i');
                const containerImg = botao.closest('.container_img');
                const img = containerImg.querySelector('img');

                // Realiza a busca dos dados que foram armazenados dentro da tag img
                const imgId = img.dataset.id;
                const imgMural = img.dataset.img;

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
                            icon: "warning",
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
                            icon: "warning",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                }
            });
        });
    }
}

buscandoImgFav();

const settingsIcon = document.getElementById("settingsIcon");
const imagesIcon = document.getElementById("imagesIcon");

// Adicionar evento de clique para cada ícone
settingsIcon.addEventListener("click", function () {
  window.location.href = "../Perfil/perfil.html"; // Altere o caminho para a página desejada
});

imagesIcon.addEventListener("click", function () {
  window.location.href = "../Mural_de_atividades/mural.html"; // Altere o caminho para a página desejada
});