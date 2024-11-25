async function handleSubmit(e) {
    e.preventDefault();
    // Impede o comportamento padrão do botão, como o envio do formulário.

    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let confirm_password = document.getElementById('confirm_password').value.trim();
    // Captura e remove espaços em branco dos valores dos campos de entrada.

    try {
        if (email && password && confirm_password) {
            let data = { nome, email, password };
            // Verifica se todos os campos foram preenchidos e cria um objeto com email e senha.

            const response = await fetch('http://localhost:3008/api/store/school', {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=UTF-8" },
                body: JSON.stringify(data)
            });
            // Envia uma solicitação POST com os dados do formulário para o endpoint '/api/store/school'.

            let content = await response.json();
            console.log(content);
            // Converte a resposta em JSON e exibe no console.

            if (content.success) {
                Swal.fire({
                    title: "Escola criada com sucesso!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });

                setTimeout(() => {
                    window.location.href = "../Login_escola/login.html";
                }, 2000);
                // Se o cadastro for bem-sucedido, exibe um alerta e redireciona para a página de login após 2 segundos.
            } else {
                console.error("Erro no cadastro:", content.message);
                Swal.fire({
                    title: "Não foi possível completar o cadastro. Por favor, tente novamente.",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 2000
                });

                // Se o cadastro falhar, exibe uma mensagem de erro no console e um alerta ao usuário.
            }
        } else {
            Swal.fire({
                title: "Por favor, preencha todos os campos.",
                icon: "warning",
                showConfirmButton: false,
                timer: 2000
            });
            // Se algum campo estiver vazio, exibe um alerta solicitando o preenchimento de todos os campos.
        }
    } catch (error) {
        console.error("Erro ao tentar cadastrar:", error.message);
        Swal.fire({
            title: "Erro ao tentar cadastrar. Por favor, tente novamente mais tarde.",
            icon: "warning",
            showConfirmButton: false,
            timer: 2000
        });
        // Captura e trata erros durante o processo de cadastro, exibindo uma mensagem de erro ao usuário.
    }
}

document.querySelector('button').addEventListener('click', handleSubmit);
// Adiciona a função 'handleSubmit' como manipulador do evento de clique do botão.
