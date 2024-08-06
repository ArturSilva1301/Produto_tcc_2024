async function handleSubmit(e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    // let codigo_escola = document.getElementById('codigo_escola').value;
    
    let data = { email, password }
    console.log(data);

    // POST
    const response = await fetch('http://localhost:3008/api/store/school', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    let content = await response.json();
    console.log(content);
    
    if (content.success) {
        alert ("Sucesso com o POST!!");

        setTimeout(() => {
            window.location.href = "../Login/login_inicio.html"
        }, 2000);

    } else {
        console.error()
        alert("Não deu o POST!!");
    };
};