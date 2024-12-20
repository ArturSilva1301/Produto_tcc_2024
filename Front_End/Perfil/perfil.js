let aba_img_fav = document.getElementById("imagemfavIcon");

let idUser = localStorage.getItem("idUser");
let tipo_usuario = localStorage.getItem("tipo_usuario");
let cod_escola = localStorage.getItem("cod_escola");

if (tipo_usuario === 'escola') {
    aba_img_fav.style.display = 'none';
  } 

const input_nome = document.getElementById("nome")
const input_email = document.getElementById("email")
const input_senha = document.getElementById("password")
const input_idescola = document.getElementById("id_escola")

// Função para buscar dados do perfil da escola
async function buscar_perfil_escola(cod_escola) {
    try {
        const response = await fetch(`http://localhost:3008/api/escola/BuscandoDados/${cod_escola}`, {
            method: "GET",
            headers: { "Content-type": "application/json;charset=UTF-8" }
        });

        const content = await response.json();

        if (content.success) {
            input_nome.value = content.data[0].nome;
            input_email.value = content.data[0].email;
            input_senha.value = content.data[0].senha;
            input_idescola.value = content.data[0].codigo_escola;
        } else {
            console.error("Erro na resposta:", content);
            Swal.fire({
                title: "Erro ao buscar dados!",
                icon: "warning",
                showConfirmButton: false,
                timer: 2000
            });
        }
    } catch (error) {
        console.error("Erro no fetch:", error);

    }
}

// Função para buscar dados do perfil do responsável
async function buscar_perfil_responsavel(idUser) {
    try {
        const response = await fetch(`http://localhost:3008/api/responsaveis/dados/${idUser}`, {
            method: "GET",
            headers: { "Content-type": "application/json;charset=UTF-8" }
        });

        const content = await response.json();

        if (content.success) {
            input_nome.value = content.data[0].nome;
            input_email.value = content.data[0].email;
            input_senha.value = content.data[0].senha;
            input_idescola.value = content.data[0].codigo_escola;
        } else {
            console.error("Erro na resposta:", content);
            Swal.fire({
                title: "Erro ao buscar dados!",
                icon: "warning",
                showConfirmButton: false,
                timer: 2000
            });
        }
    } catch (error) {
        console.error("Erro no fetch:", error);
    }
}

// Verificar o tipo de usuário e chamar a função correspondente
if (tipo_usuario === 'escola') {
    const cod_escola = Number(localStorage.getItem('cod_escola'));
    buscar_perfil_escola(cod_escola);
} else if (tipo_usuario === 'responsavel') {
    const idUser = Number(localStorage.getItem('idUser'));
    buscar_perfil_responsavel(idUser);
} else {
    Swal.fire({
        title: "Tipo de usuário desconhecido! Faça o login novamente!",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000
    });
    window.location.href = '../home/home.html';
}


// Altrando imagem perfil

const perfil_img = document.querySelector('.perfil_img');

perfil_img.onclick = async function () {
    const { value: file } = await Swal.fire({
        title: "Selecione a imagem para seu perfil",
        input: "file",
        inputAttributes: {
            "accept": "image/*",
            "aria-label": "Upload your profile picture"
        }
    });
    if (file) {

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