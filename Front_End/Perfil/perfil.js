const id_User = Number(localStorage.getItem('idUser'));

// Puxando dados do usuario GET 
async function buscar_perfil (ID_User_) {
    const response = await fetch(`http://localhost:3010/api/User/BuscandoDadosUser/${ID_User_}`, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" }
    });

    let content = await response.json();
    console.log(content);
    
    if (content.sucess) {
        alert('SÓ SUCESSO!');

        // window.location.reload();
        //recarrega a página

    } else {
        console.error()
        alert("Não deu o GET!!");
    };
};

buscar_perfil(id_User);