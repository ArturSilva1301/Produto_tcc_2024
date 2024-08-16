async function handleSubmit(e) {
    e.preventDefault();

    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    
    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let data = { email, password };
    console.log(data);

    try {
        const response = await fetch('http://localhost:3008/api/store/school', {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message || 'Erro desconhecido');
        }

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
    } catch (error) {
        console.error("Erro ao tentar cadastrar:", error.message);
        alert("Erro ao tentar cadastrar. Por favor, tente novamente mais tarde.");
    }
}

document.querySelector('button').addEventListener('click', handleSubmit);
