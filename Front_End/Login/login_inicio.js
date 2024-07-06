let button = document.querySelector('button');

button.onclick = async function(e) {
    e.preventDefault();
    
    let email_user = document.getElementById('email').value;
    let senha_user = document.getElementById('password').value;
    let cod_escola = document.getElementById('cod_escola').value;

    let data = {email_user, senha_user, cod_escola }

        // POST

    const response = await fetch('http://localhost:3008/api/User/BuscandoDadosUser/', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    let content = await response.json();
    console.log(content);
    
    if (content.sucess && content.data.length) {
        
            if(content.data[0].senha === senha_user && content.data[0].codigo_escola === cod_escola) {
                localStorage.setItem('idUser', content.data[0].id)

                Swal.fire({
                    title: "Login realizado com sucesso!!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });

                setTimeout(() => {
                    window.location.href = "../Perfil/perfil.html"
                }, 2000);
            }
            
            else {
                Swal.fire({
                    title: "Conta não encontrada!!",
                    text: "Tente novamente!! Ou crie uma conta!!",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2300
                });
            }



    } else {
        console.error()
        alert("deu merda no get!!");
    };
};