let button = document.querySelector('button');
// Seleciona o botão na página e armazena na variável 'button'.

button.onclick = async function(e) {
    e.preventDefault();
    // Impede o comportamento padrão do botão (como enviar o formulário).

    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let senha = document.getElementById('senha').value.trim();
    let confirm_senha = document.getElementById('confirm_senha').value.trim();
    let codigo_escola = document.getElementById('codigo_escola').value.trim();
    // Captura e remove espaços em branco dos valores dos campos de entrada.

    if (!nome || !email || !senha || !codigo_escola) {
        Swal.fire({
            title: "Por favor, preencha todos os campos.",
            icon: "warning",
            showConfirmButton: false,
            timer: 2000
        });
        // Exibe um alerta se algum campo obrigatório estiver vazio.
        return;
    }

    let data = { nome, email, senha, confirm_senha, codigo_escola };
    // Cria um objeto com os dados do formulário.

    try {
        const response = await fetch('http://localhost:3008/api/cadastro', {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });
        // Envia uma solicitação POST para o servidor com os dados do formulário no corpo da requisição.

        if (!response.ok) {
            let error = await response.json();
            console.error('Erro na resposta:', error);
            throw new Error(error.message || 'Erro desconhecido');
            // Lança um erro se a resposta não for bem-sucedida, exibindo a mensagem de erro do servidor.
        }

        let content = await response.json();
        console.log('Resposta do servidor:', content);
        // Converte a resposta em JSON e a exibe no console.

        if (content.success) {
            Swal.fire({
                title: "Cadastro realizado com sucesso!",
                icon: "warning",
                showConfirmButton: false,
                timer: 2000
            });

            window.location.replace("../Login_responsavel/login.html");
            // Exibe um alerta de sucesso e redireciona para a página de login se o cadastro for bem-sucedido.
        } else {
            console.log(content)
            console.error("Erro no cadastro:", content.message);
            Swal.fire({
                title: "Não foi possível completar o cadastro. Por favor, tente novamente.",
                icon: "warning",
                showConfirmButton: false,
                timer: 2000
            });
            
            // Exibe uma mensagem de erro se o cadastro falhar.
        }
    } catch (error) {
        console.error("Erro ao tentar cadastrar:", error.message);
        Swal.fire({
            title: "Erro ao tentar cadastrar. Por favor, tente novamente mais tarde.",
            icon: "warning",
            showConfirmButton: false,
            timer: 2000
        });
        // Captura e exibe erros que ocorram durante o processo de cadastro.
    }
};
