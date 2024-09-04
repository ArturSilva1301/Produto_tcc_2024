let button = document.querySelector('button');
// Seleciona o elemento 'button' no documento e o armazena na variável 'button'.

button.onclick = async function(e) {
    e.preventDefault();
    // Define um evento de clique para o botão. Quando clicado, a função é executada. 
    // 'e.preventDefault()' impede o comportamento padrão do botão, como recarregar a página.

    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let senha = document.getElementById('password').value.trim();
    let cod_escola = document.getElementById('codigo_escola').value.trim();
    // Captura os valores dos campos de entrada (email, senha, e código da escola) e remove os espaços em branco extras.

    if (!nome || !email || !senha || !cod_escola) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    // Verifica se todos os campos foram preenchidos. Se algum campo estiver vazio, exibe um alerta e interrompe a execução.

    let data = { nome, email, senha, cod_escola };
    // Cria um objeto 'data' contendo os valores capturados dos campos de entrada.

    try {
        const response = await fetch('http://localhost:3008/api/responsaveis/login', { // Endpoint de login dos responsáveis
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });
        // Envia uma solicitação POST para o endpoint de login, enviando os dados do formulário no corpo da requisição como JSON.

        if (!response.ok) {
            throw new Error('Erro ao realizar login');
        }
        // Verifica se a resposta da solicitação foi bem-sucedida. Caso contrário, lança um erro.

        let content = await response.json();
        console.log(content);
        // Converte a resposta em JSON e a armazena em 'content'. Exibe o conteúdo no console.

        if (content.success && content.data.length > 0) {
            if (content.data[0].senha === senha && content.data[0].codigo_escola === cod_escola) {
                localStorage.setItem('idUser', content.data[0].id);
                // Verifica se as credenciais fornecidas correspondem às informações recebidas. 
                // Se sim, armazena o ID do usuário no 'localStorage'.

                Swal.fire({
                    title: "Login realizado com sucesso!!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
                // Exibe um alerta de sucesso com SweetAlert2 informando que o login foi realizado com sucesso.

                setTimeout(() => {
                    window.location.href = "../Perfil/perfil.html";
                }, 2000);
                // Após 2 segundos, redireciona o usuário para a página de perfil.
            } else {
                Swal.fire({
                    title: "Conta não encontrada!!",
                    text: "Tente novamente ou crie uma conta!!",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2300
                });
                // Se as credenciais não corresponderem, exibe um alerta informando que a conta não foi encontrada.
            }
        } else {
            console.error("Erro ao realizar login:", content.message);
            alert("Conta não encontrada!!");
            // Se o login não foi bem-sucedido, exibe uma mensagem de erro no console e um alerta de conta não encontrada.
        }
    } catch (error) {
        console.error("Erro ao realizar login:", error.message);
        alert("Erro ao realizar login. Por favor, tente novamente mais tarde.");
        // Captura e trata qualquer erro que ocorra durante o processo de login, exibindo uma mensagem de erro apropriada.
    }
};
