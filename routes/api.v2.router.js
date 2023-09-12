const express = require("express");
const apiv2 = express.Router();
const ambiente = require("../knexfile")[process.env.NODE_ENV || development ]
const knexfile = require("../knexfile");
const { default: knex } = require("knex");
const conection = require("knex")(ambiente);



apiv2.use(express.json());
apiv2.use(express.urlencoded({ extended: true }));

//apiv1.use(express.json);

apiv2.get('/produtos', (req, res) => {    
    
    conection("produtos").then( lista => {
        res.status(200).json(lista)    
    })
})

apiv2.get('/produtos/:id', (req, res) => {    
    conection("produtos")
    .where({id: req.params.id})
    .then( produto => {
        if(produto.length) {
            res.status(200).json(produto)    
        } else {
            res.status(404).json({ mensagem: "Produto não encontrado"});
        }
    })
})

apiv2.post('/produtos', async (req, res) => {
    
    const produto = req.body;
    

    if (!produto.descricao || !produto.valor || !produto.marca) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    conection("produtos")
        .insert(produto, "id")
        .then( produtos => {             
            res.status(201).json(produtos);
        })
        .catch( err =>  {
            if (err.constraint==="produtos_descricao_unique") {
                res.status(400).json({ error: 'Produto já cadastrado.' });
            } else {
                res.status(500).json({ error: 'Erro ao criar o produto.' });
            }
            
        }) ;
});

apiv2.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, marca } = req.body;
    console.log(req.body)
    try {
      await conection('produtos').where('id', id).update({ descricao, valor, marca  });
      const produto = await conection.select().from('produtos').where('id', id).first();
      res.json(produto);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o produto.' });
    }
  });

apiv2.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await conection('produtos').where('id', id).del();
      res.json({ message: 'Produto excluído com sucesso.' });
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Erro ao excluir o produto.' });
    }
  });

module.exports  = apiv2;