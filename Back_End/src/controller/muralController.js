const fileUpload = require('express-fileupload');
// Importa o módulo 'express-fileupload' para lidar com uploads de arquivos na aplicação.

const connection = require('../config/db');
// Importa a configuração do banco de dados a partir do arquivo '../config/db', permitindo executar queries no banco de dados.

const dotenv = require('dotenv').config();
// Carrega as variáveis de ambiente a partir do arquivo '.env' para o processo atual.

const fs = require('fs');
// Importa o módulo 'fs' para trabalhar com o sistema de arquivos (leitura/escrita de arquivos e diretórios).

const path = require('path');
// Importa o módulo 'path' para manipular caminhos de arquivos e diretórios.

const caminhoimg = path.join(__dirname, '..', 'uploads');
// Define o caminho onde as imagens enviadas serão salvas, na pasta 'uploads'.

if (!fs.existsSync(caminhoimg)) {
  fs.mkdirSync(caminhoimg);
}
// Verifica se o diretório 'uploads' existe. Se não existir, ele é criado com 'fs.mkdirSync'.

async function postImagem(request, response) {

  if(!request.files) {
    return response.status(400).json({
      success: false,
      message: "Você não enviou o arquivo de imagem"
    });
  }
  // Verifica se algum arquivo foi enviado no request. Se não houver, retorna uma resposta com erro 400.

  const imagem = request.files.imagem; // Acessando a imagem corretamente
  const imgnome = Date.now() + path.extname(imagem.name); // Nome único para a imagem
  // Captura a imagem enviada no request e gera um nome único para a imagem utilizando o timestamp atual e a extensão original do arquivo.

  imagem.mv(path.join(caminhoimg, imgnome), (erro) => { // Corrigido para 'imagem.mv'
    if (erro) {
      return response.status(400).json({
        success: false,
        message: "Erro ao mover o arquivo",
      });
    }
    // Move a imagem para o diretório 'uploads'. Se ocorrer um erro durante o processo, retorna uma resposta com erro 400.

    const params = Array(
      imgnome,
      request.body.cod_escola 
    );
    // Cria um array 'params' contendo o nome da imagem, que será usado na query do banco de dados.

    const query = "INSERT INTO imagem(imagem, codigo_escola) VALUES(?,?)"; // Correção para 'UPDATE'
    // Define a query SQL para inserir o nome da imagem na tabela 'imagem'.

    connection.query(query, params, (err, results) => {
      if (results) {
        response.status(200).json({
          success: true,
          message: "Sucesso no update!",
          params: params,
          data: results
        });
        // Se a query for executada com sucesso, retorna uma resposta com sucesso 200, incluindo os dados inseridos.

      } else {
        response.status(400).json({
          success: false,
          message: "Problema no update!",
          data: err
        });
        // Se houver um erro ao executar a query, retorna uma resposta com erro 400 e a mensagem de erro.
      }
    });

  });

}

async function getImagem(request, response) {
  const codEscola = request.params.cod_escola;
  
  // Verifica se o código da escola foi fornecido
  if (!codEscola) {
    return response.status(400).json({
      success: false,
      message: "Código da escola não fornecido."
    });
  }

  const query = "SELECT imagem FROM imagem WHERE codigo_escola = ?";
  
  connection.query(query, [codEscola], (err, results) => {
    if (err) {
      return response.status(500).json({
        success: false,
        message: "Erro ao acessar o banco de dados.",
        data: err
      });
    }

    if (results.length > 0) {
      response.status(200).json({
        success: true,
        message: "Imagem encontrada.",
        data: results
      });
    } else {
      response.status(404).json({
        success: false,
        message: "Imagem não encontrada."
      });
    }
  });
}

async function salvarImgMural(request, response) {
  // Obtém os IDs da atividade e do usuário do corpo da requisição
  const imagemId = request.body.atividade_id;
  const usuarioId = request.body.usuario_id;

  // Define os parâmetros a serem inseridos na tabela 'salvos'
  const params = [
      atividadeId,
      usuarioId
  ];

  // Define a query SQL para salvar a atividade para o usuário
  const query = 'INSERT INTO salvos(atividade_id, id_usuario) VALUES(?,?)';

  // Executa a query no banco de dados
  connection.query(query, params, (err, results) => {
      if (err) {
          response.status(400).json({ 
              success: false, 
              message: "Erro ao salvar atividade!"
          });
      } else {
          response.status(201).json({ 
              success: true, 
              message: "Atividade salva com sucesso!" 
          });
      }
  });
}


module.exports = { postImagem, getImagem };
// Exporta a função 'postImagem' para ser utilizada em outras partes da aplicação.
