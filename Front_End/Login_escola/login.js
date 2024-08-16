let button = document.querySelector('button');

button.onclick = async function(e) {
    e.preventDefault();
    
    let email_user = document.getElementById('email').value.trim();
    let senha_user = document.getElementById('password').value.trim();
    let cod_escola = document.getElementById('cod_escola').value.trim();

    if (!email_user || !senha_user || !cod_escola) {
        Swal.fire({
            title: "Preencha todos os campos!",
            icon: "warning",
            showConfirmButton: false,
            timer: 2000
        });
        return;
    }

    let data = { email_user, senha_user, cod_escola };

    try {
        const response = await fetch('http://localhost:3008/api/User/BuscandoDadosUser', {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao realizar login');
        }

        let content = await response.json();
        console.log(content);

        if (content.success && content.data.length > 0) {
            if (content.data[0].senha === senha_user) {
                localStorage.setItem('idUser', content.data[0].codigo_escola);

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
                    title: "Credenciais inválidas!",
                    text: "Verifique suas credenciais e tente novamente.",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2300
                });
            }
        } else {
            Swal.fire({
                title: "Conta não encontrada!",
                text: "Verifique seus dados e tente novamente.",
                icon: "error",
                showConfirmButton: false,
                timer: 2300
            });
        }
    } catch (error) {
        console.error('Erro na requisição:', error.message);
        Swal.fire({
            title: "Erro",
            text: "Erro ao realizar a requisição.",
            icon: "error"
        });
    }
};
