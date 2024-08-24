let button = document.querySelector("button");

button.onclick = async function (event) {
  event.preventDefault();

  let form = document.getElementById("forms_mural");
  let formData = new FormData(form);

  const response = await fetch("http://localhost:3008/api/update/postimg", {
    method: "POST",
    body: formData,
  });

    let content = await response.json();
    console.log(content);

    if (content.success) {
      alert("IMAGEM FOI!");
    } else {
      console.error("ERRO ao mandar a imagem:", content.sql);
      alert("Selecione a imagem novamente");
    }
};
