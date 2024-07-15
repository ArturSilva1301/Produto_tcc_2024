let button = document.querySelector('button');

button.onclick = async function(e) {
    e.preventDefault();
    
    let email = document.getElementById('email').value;
    let senha = document.getElementById('password').value;
    let cod_escola = document.getElementById('cod_escola').value;

    let data = { email, senha, cod_escola }; // Corrigido para usar 'senha' em vez de 'senha_user'

    try {
        const response = await fetch('http://localhost:3008/api/User/BuscandoDadosUser/', {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao realizar login');
        }

        let content = await response.json();
        console.log(content);

        if (content.success && content.data.length > 0) {
            if (content.data[0].senha === senha && content.data[0].codigo_escola === cod_escola) {
                localStorage.setItem('idUser', content.data[0].id);

                Swal.fire({
                    title: "Login realizado com sucesso!!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });

                setTimeout(() => {
                    window.location.href = "../Perfil/perfil.html";
                }, 2000);
            } else {
                Swal.fire({
                    title: "Conta não encontrada!!",
                    text: "Tente novamente ou crie uma conta!!",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2300
                });
            }
        } else {
            console.error("Erro ao realizar login:", content.message);
            alert("Conta não encontrada!!");
        }
    } catch (error) {
        console.error("Erro ao realizar login:", error.message);
        alert("Erro ao realizar login. Por favor, tente novamente mais tarde.");
    }
};
