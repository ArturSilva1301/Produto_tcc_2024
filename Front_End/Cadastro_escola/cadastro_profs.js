async function handleSubmitProfessor(e) {
    e.preventDefault();
    // Impede o comportamento padrão do botão, como o envio do formulário.

    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let codigo_escola = document.getElementById('codigo_escola').value.trim();
    // Captura e remove espaços em branco dos valores dos campos de entrada.

    try {
        if (nome && email && password && codigo_escola) {
            let data = {nome, email, password, codigo_escola };
            // Verifica se todos os campos foram preenchidos e cria um objeto com os dados do professor.

            const response = await fetch('http://localhost:3008/api/store/professor', {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=UTF-8" },
                body: JSON.stringify(data)
            });
            // Envia uma solicitação POST com os dados do formulário para o endpoint '/api/store/professor'.

            let content = await response.json();
            console.log(content);
            // Converte a resposta em JSON e exibe no console.

            if (content.success) {
                alert("Professor cadastrado com sucesso!");
                setTimeout(() => {
                    window.location.href = "../Login_professor/login.html";
                }, 2000);
                // Se o cadastro for bem-sucedido, exibe um alerta e redireciona para a página de login após 2 segundos.
            } else {
                console.error("Erro no cadastro:", content.message);
                alert("Não foi possível completar o cadastro. Por favor, tente novamente.");
                // Se o cadastro falhar, exibe uma mensagem de erro no console e um alerta ao usuário.
            }
        } else {
            alert("Por favor, preencha todos os campos.");
            // Se algum campo estiver vazio, exibe um alerta solicitando o preenchimento de todos os campos.
        }
    } catch (error) {
        console.error("Erro ao tentar cadastrar:", error.message);
        alert("Erro ao tentar cadastrar. Por favor, tente novamente mais tarde.");
        // Captura e trata erros durante o processo de cadastro, exibindo uma mensagem de erro ao usuário.
    }
}

// Adiciona a função 'handleSubmitProfessor' como manipulador do evento de clique do botão de cadastro de professor.
document.querySelector('button').addEventListener('click', handleSubmitProfessor);
