let button = document.getElementById("enviar")

button.onclick = async function() {
    let form =document.getElementById("forms_mural")
    let dadosForm = new FormData(form);

    const response = await fetch ('http://localhost:3008/api/store/school', {
        method: "POST",
        body: dadosForm
    })

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