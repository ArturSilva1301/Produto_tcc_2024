let button = document.querySelector('button');
// Seleciona o elemento 'button' na página e o armazena na variável 'button'.

button.onclick = async function(e) {
    e.preventDefault();
    // Define um evento de clique para o botão. Quando o botão é clicado, a função é executada.
    // 'e.preventDefault()' impede o comportamento padrão do botão, como enviar o formulário ou recarregar a página.

    let email_user = document.getElementById('email').value.trim();
    let senha_user = document.getElementById('password').value.trim();
    let cod_escola = document.getElementById('cod_escola').value.trim();
    // Captura os valores dos campos de entrada (email, senha, e código da escola) e remove os espaços em branco extras.

    if (!email_user || !senha_user || !cod_escola) {
        Swal.fire({
            title: "Preencha todos os campos!",
            icon: "warning",
            showConfirmButton: false,
            timer: 2000
        });
        // Verifica se todos os campos foram preenchidos. Se algum campo estiver vazio, exibe um alerta com SweetAlert2 e interrompe a execução.
        return;
    }

    let data = { email_user, senha_user, cod_escola };
    // Cria um objeto 'data' contendo os valores capturados dos campos de entrada.

    try {
        const response = await fetch('http://localhost:3008/api/User/BuscandoDadosUser', {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });
        // Envia uma solicitação POST para o endpoint '/api/User/BuscandoDadosUser', 
        // enviando os dados do formulário no corpo da requisição como JSON.

        if (!response.ok) {
            throw new Error('Erro ao realizar login');
        }
        // Verifica se a resposta da solicitação foi bem-sucedida. Caso contrário, lança um erro.

        let content = await response.json();
        console.log(content);
        // Converte a resposta em JSON e a armazena em 'content'. Exibe o conteúdo no console.

        if (content.success && content.data.length > 0) {
            if (content.data[0].senha === senha_user) {
                localStorage.setItem('cod_escola', content.data[0].codigo_escola);
                // Verifica se a senha fornecida corresponde à senha retornada pela API.
                // Se sim, armazena o código da escola no 'localStorage' como 'idUser'.

                Swal.fire({
                    title: "Login realizado com sucesso!!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
                // Exibe um alerta de sucesso com SweetAlert2 informando que o login foi realizado com sucesso.

                setTimeout(() => {
                    window.location.href = "../Mural_de_atividades/mural.html";
                }, 2000);
                // Após 2 segundos, redireciona o usuário para a página do mural de atividades.
            } else {
                Swal.fire({
                    title: "Credenciais inválidas!",
                    text: "Verifique suas credenciais e tente novamente.",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2300
                });
                // Se a senha não corresponder, exibe um alerta de erro com uma mensagem indicando credenciais inválidas.
            }
        } else {
            Swal.fire({
                title: "Conta não encontrada!",
                text: "Verifique seus dados e tente novamente.",
                icon: "error",
                showConfirmButton: false,
                timer: 2300
            });
            // Se a resposta não contiver dados de usuário, exibe um alerta indicando que a conta não foi encontrada.
        }
    } catch (error) {
        console.error('Erro na requisição:', error.message);
        Swal.fire({
            title: "Erro",
            text: "Erro ao realizar a requisição.",
            icon: "error"
        });
        // Captura e trata qualquer erro que ocorra durante o processo de login,
        // exibindo uma mensagem de erro apropriada com SweetAlert2.
    }
};
