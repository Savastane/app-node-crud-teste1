const express = require("express");
const apiv1 = express.Router();

const Estoque = {
    
    produtos : [
    { Id: 1, Descricao: "Arroz parborizado 5kg", Valor: 25.00, Marca: "Tio João" } ,
    { Id: 2, Descricao: "Maionese 250gr", Valor: 7.20, Marca: "Helmans" } ,
    { Id: 3, Descricao: "Iogurte Natural 200ml", Valor: 2.50, Marca: "Itambé" } ,
    { Id: 4, Descricao: "Batata Palha Maior 300gr", Valor: 15.20, Marca: "Chipps" } ,
    { Id: 5, Descricao: "Nescau 400g", Valor: 8.0, Marca: "Nestle" } ,

 ]
}; 

apiv1.use(express.json());
apiv1.use(express.urlencoded({ extended: true }));

//apiv1.use(express.json);

apiv1.get('/produtos', (req, res) => {    
    res.status(200).json(Estoque.produtos)    
})

apiv1.get('/produtos/:id', (req, res) => {
    
    const id = parseInt(req.params.id)
    const idx = Estoque.produtos.findIndex( p => p.Id === id )

    if (idx >-1)
    {
        res.status(200).json(Estoque.produtos[idx]);
    }
    else
    {
        res.status(404).json({ mensagem: "Produto não encontrado"});
    }
    
})

module.exports  = apiv1;