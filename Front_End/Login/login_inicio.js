let button = document.querySelector('button');

button.onclick = async function(e) {
    e.preventDefault();
    
    let email_user = document.getElementById('email').value;
    let senha_user = document.getElementById('password').value;
    let cod_escola = document.getElementById('cod_escola').value;

    // GET
    const response = await fetch('http://localhost:3008/api/User/BuscandoTDS', {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" }
    });

    let content = await response.json();
    console.log(content);
    
    if (content.sucess) {
        for (let i = 0; i < content.data.length; i++) {
            if(content.data[i].email === email_user && content.data[i].senha === senha_user && content.data[i].codigo_escola === cod_escola) {
                localStorage.setItem('idUser', content.data[i].id)

                Swal.fire({
                    title: "Login realizado com sucesso!!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
                setTimeout(() => {
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
        }


    } else {
        console.error()
        alert("deu merda no get!!");
    };
};