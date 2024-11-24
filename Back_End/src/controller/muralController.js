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

  if (!request.files) {
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
        response.status(201).json({
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
      message: "Código da escola não fornecido.",
    });
  }

  const query = "SELECT id, imagem FROM imagem WHERE codigo_escola = ?";

  connection.query(query, [codEscola], (err, results) => {
    if (err) {
      response.status(400).json({
        success: false,
        message: "Erro ao buscar as imagens!",
      });

    } else {
      response.status(200).json({
        success: true,
        message: "Imagens buscadas!",
        data: results,
      });
    }
  });
}

// Favorita a imagem do usuário
function favImagem(request, response) {
  const { img_mural, idUser, cod_escola } = request.body;

  // Selecionando o id da imagem
  const querySelect = "SELECT id FROM imagem WHERE codigo_escola = ? AND imagem = ?";

  // Executa a primeira query
  connection.query(querySelect, [cod_escola, img_mural], (err, results) => {
    if (err) {
      return response.status(400).json({
        success: false,
        message: "Erro ao buscar o id da imagem!",
      });
    }

    if (results.length === 0) {
      return response.status(404).json({
        success: false,
        message: "Nenhum resultado encontrado!",
      });
    }

    // Armazenando imagem favoritada
    const queryInsert = "INSERT INTO imagem_fav(id_img, imagem, id_responsavel, id_escola) VALUES(?,?,?,?)";

    const params = [
      results[0].id,
      img_mural,
      idUser,
      cod_escola
    ];

    // Executa a segunda query
    connection.query(queryInsert, params, (err, results) => {
      if (err) {
        return response.status(400).json({
          success: false,
          message: "Erro ao salvar imagem!",
        });
      }

      // Responde com sucesso
      return response.status(201).json({
        success: true,
        message: "Imagem favoritada com sucesso!",
      });
    });
  });
}

// Deleta a imagem favoritada pelo usuário
function DelfavImagem(request, response) {
  const { id_img_mural } = request.body;

  // Selecionando o id da imagem
  const querySelect = "DELETE FROM imagem_fav WHERE id_img = ?;";

  // Executa a primeira query
  connection.query(querySelect, [id_img_mural], (err, results) => {
    if (err) {
      return response.status(400).json({
        success: false,
        message: "Erro ao desfavoritar imagem!",
        data: results
      });
    }
    else {
      return response.status(201).json({
        success: true,
        message: "Imagem desfavoritada com sucesso!",
        data: results
      });
    }
  });
}

// Realiza a busca do id das imagens favoritadas pelo usuário, para assim, o frontend realizar a diferenciação das imagens que foram e que não foram favoritadas pelo usuário
async function getImgFav(request, response) {
  const idUser = request.params.idUser;

  const query = "SELECT id_img FROM imagem_fav WHERE id_responsavel = ?";

  connection.query(query, [idUser], (err, results) => {
    if (err) {
      response.status(400).json({
        success: false,
        message: "Erro ao buscar imgs favoritadas pelo usuário!",
        data: results
      });

    } else {
      response.status(201).json({
        success: true,
        message: "Sucesso ao buscar imgs favoritadas pelo usuário!",
        data: results,
      });
    }
  });
}

// Exporta as funções
module.exports = { postImagem, getImagem, favImagem, DelfavImagem, getImgFav };