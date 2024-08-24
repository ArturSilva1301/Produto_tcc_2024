const fileUpload = require('express-fileupload');
const connection = require('../config/db');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');

const caminhoimg = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(caminhoimg)) {
  fs.mkdirSync(caminhoimg);
}

async function postImagem(request, response) {

  if(!request.files) {
    return response.status(400).json({
      success: false,
      message: "Você não enviou o arquivo de imagem"
    });
  }

  const imagem = request.files.imagem; // Acessando a imagem corretamente
  const imgnome = Date.now() + path.extname(imagem.name); // Nome único para a imagem

  imagem.mv(path.join(caminhoimg, imgnome), (erro) => { // Corrigido para 'imagem.mv'
    if (erro) {
      return response.status(400).json({
        success: false,
        message: "Erro ao mover o arquivo",
      })
    }

    const params = Array(
      imgnome
    )

    const query = "INSERT INTO imagem(imagem) VALUES(?)"; // Correção para 'UPDATE'  
    
    connection.query(query, params, (err, results) => {
      if (results) {
        response.status(200).json({
          success: true,
          message: "Sucesso no update!",
          params: params,
          data: results
        });
      } else {
        response.status(400).json({
          success: false,
          message: "Problema no update!",
          data: err
        });
      }
    });

  });


}

module.exports = { postImagem };
