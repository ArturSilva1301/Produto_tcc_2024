const { error } = require('console');
const connection = require('../config/db')
const dotenv = require('dotenv').config();

const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, '..', 'upload');

if(!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

async function storeMural(request, response) {
    
    if(!request.files) {
        request response.status(400).json({
            success: false,
            message: "Você não enviou o arquivo de foto."
        });
    }

    const imagem = request.files.imagem;
    const imagemNome = Data.now() + path.extname(imagem.name)

    imagem.mv(path.join(uploadPath, imagemNova), (erro) => {
        if(erro) {
            return response.status(400).json({
                success: false,
                message: "Erro ao mover o arquivo."  
            })
        }

        const params = Array(
            imagemNome,
            request.body.nome_img

        )

        const query = "INSET INTO  imagens(nome, imagem) VALUES(?,?)";
    
    });

    

}