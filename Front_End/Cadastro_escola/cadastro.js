async function handleSubmit(e) {
    e.preventDefault();

    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let confirm_password = document.getElementById('confirm_password').value.trim();
    
    if (email && password && confirm_password) {
        let data = { email, password };

        const response = await fetch('http://localhost:3008/api/store/school', {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        let content = await response.json();
        console.log(content);

        if (content.success) {
            alert("Escola criada com sucesso!");
            setTimeout(() => {
                window.location.href = "../Login_escola/login.html";
            }, 2000);
        } else {
            console.error("Erro no cadastro:", content.message);
            alert("Não foi possível completar o cadastro. Por favor, tente novamente.");
        }
    }
    else {
        alert("Por favor, preencha todos os campos.");
    }
}

document.querySelector('button').addEventListener('click', handleSubmit);