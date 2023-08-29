

// Na pasta request tem os exemplos das requisicoes 
// usando a extensao Rest Client

// usar o módulo express
const express = require('express');

//inicializar
const app = express();

// portar
const PORT = 4000;

//analisar o corpo das solicitações com formato JSON
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// Simulando um objeto JSON para armazenar os dados
let produtos = [
    { Id: 1, Descricao: "Arroz parborizado 5kg", Valor: 25.00, Marca: "Tio João" } ,
    { Id: 2, Descricao: "Maionese 250gr", Valor: 7.20, Marca: "Helmans" } ,
    { Id: 3, Descricao: "Iogurte Natural 200ml", Valor: 2.50, Marca: "Itambé" } ,
    { Id: 4, Descricao: "Batata Palha Maior 300gr", Valor: 15.20, Marca: "Chipps" } ,
    { Id: 5, Descricao: "Nescau 400g", Valor: 8.0, Marca: "Nestle" } ,



]; 


// Rota para listar os produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});


// Rota para obter um produto
app.get('/produtos/:id', (req, res) => {
  
    const Id = parseInt(req.params.id);

    const produto = produtos.find(produto => produto.Id === Id);
  
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ message: 'Produto nao encontrado' });
    }
}
);


// Rota para adicionar um novo produto
app.post('/produtos', (req, res) => {
   produto = req.body
  
  
  produto.Id = produtos.length + 1;
  
  produtos.push(produto);
  res.status(200).json(produto);

});



// Rota para atualizar um produtos existente
app.put('/produtos/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const produto = req.body;

  const indice = produtos.findIndex(item => item.Id === id);

  if (indice !== -1) {
    produtos[indice] = { ...produtos[indice], ...produto };
    res.json(produtos[indice]);
  } else {
    res.status(404).json({ message: 'produtos não encontrar' });
  }
});

// Rota para remover um produtos
app.delete('/produtos/:id', (req, res) => {

  const id = parseInt(req.params.id);
  console.log(id);
  //const indice = produtos.findIndex(item => item.id === id);
  let indice = -1;
  
  for(var i=0; i<produtos.length; i++) {
    if(produtos[i].Id === id) {
      indice =i;
    }
  };

    
  console.log(indice);
  if (indice !== -1) {
    const produto = produtos.splice(indice, 1);    
    res.json(produto[0]);

  } else {
    res.status(404).json({ message: 'produtos não encontrar' });
  }
});


 app.listen(PORT, () => {
  console.log(`O Servidor está rodando na porta  `);  
 });

//--module.exports = app;