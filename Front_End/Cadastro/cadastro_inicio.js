let button = document.querySelector('button');

button.onclick = async function (e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let codigo_escola = document.getElementById('codigo_escola').value;
    
    let data = { email, password, codigo_escola }

    // POST
    const response = await fetch('http://localhost:3008/api/cadastro', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    let content = await response.json();
    console.log(content);
    
    if (content.sucess) {
        alert ("Sucesso com o POST!!");

    } else {
        console.error()
        alert("Não deu o POST!!");
    };
};