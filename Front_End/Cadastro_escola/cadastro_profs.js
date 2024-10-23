async function handleSubmitProfessor(e) {
    e.preventDefault();

    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let codigo_escola = document.getElementById('codigo_escola').value.trim();

    try {
        if (nome && email && password && codigo_escola) {
            let data = { nome, email, password, codigo_escola };

            const response = await fetch('http://localhost:3008/api/store/professor', {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=UTF-8" },
                body: JSON.stringify(data)
            });

            let content = await response.json();
            if (content.success) {
                alert("Professor cadastrado com sucesso!");
                setTimeout(() => {
                    window.location.href = "../Login_professor/login.html";
                }, 2000);
            } else {
                alert("Erro no cadastro. Tente novamente.");
            }
        } else {
            alert("Preencha todos os campos.");
        }
    } catch (error) {
        alert("Erro ao cadastrar. Tente novamente mais tarde.");
    }
}

document.querySelector('button').addEventListener('click', handleSubmitProfessor);
