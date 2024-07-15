let button = document.querySelector('button');

button.onclick = async function(e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let senha = document.getElementById('password').value;
    let codigo_escola = document.getElementById('codigo_escola').value;
    
    let data = { email, senha, codigo_escola };

    try {
        const response = await fetch('http://localhost:3008/api/cadastro', {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar');
        }

        let content = await response.json();
        console.log(content);
        
        if (content.success) {
            alert ("Sucesso com o POST!!");

            setTimeout(() => {
                window.location.href = "../Login/login_inicio.html";
            }, 2000);

        } else {
            console.error("Erro no cadastro:", content.message);
            alert("Não foi possível completar o cadastro. Por favor, tente novamente.");
        }
    } catch (error) {
        console.error("Erro no cadastro:", error.message);
        alert("Erro ao tentar cadastrar. Por favor, tente novamente mais tarde.");
    }
};
