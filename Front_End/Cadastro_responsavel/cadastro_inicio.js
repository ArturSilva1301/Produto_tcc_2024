let button = document.querySelector('button');

button.onclick = async function(e) {
    e.preventDefault();

    let email = document.getElementById('email').value.trim();
    let senha = document.getElementById('senha').value.trim();
    let confirm_senha = document.getElementById('confirm_senha').value.trim();
    let codigo_escola = document.getElementById('codigo_escola').value.trim();

    if (!email || !senha || !codigo_escola) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let data = { email, senha, confirm_senha, codigo_escola };

    try {
        const response = await fetch('http://localhost:3008/api/cadastro', {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            let error = await response.json();
            console.error('Erro na resposta:', error);
            throw new Error(error.message || 'Erro desconhecido');
        }

        let content = await response.json();
        console.log('Resposta do servidor:', content);

        if (content.success) {
            alert("Cadastro realizado com sucesso!");
            window.location.replace("../Login_responsavel/login.html");
        } else {
            console.log(content)
            console.error("Erro no cadastro:", content.message);
            alert("Não foi possível completar o cadastro. Por favor, tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao tentar cadastrar:", error.message);
        alert("Erro ao tentar cadastrar. Por favor, tente novamente mais tarde.");
    }
};
