let button = document.querySelector('button');

button.onclick = async function(e) {
    e.preventDefault();

    let email = document.getElementById('email').value.trim();
    let senha = document.getElementById('password').value.trim();
    let codigo_escola = document.getElementById('codigo_escola').value.trim();

    if (!email || !senha || !codigo_escola) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let data = { email, senha, codigo_escola };

    try {
        const response = await fetch('http://localhost:3008/api/cadastro', {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let content = await response.json();
        console.log(content);

        if (content.success) {
            alert ("Cadastro realizado com sucesso!");
            window.location.replace("../Login/login.html");
        } else {
            console.error("Erro no cadastro:", content.message);
            alert("Não foi possível completar o cadastro. Por favor, tente novamente.");
        }
    } catch (error) {
        console.error("Erro no cadastro:", error.message);
        alert("Erro ao tentar cadastrar. Por favor, tente novamente mais tarde.");
    }
}