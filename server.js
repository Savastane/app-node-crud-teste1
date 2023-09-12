require("dotenv").config();
console.log("Ambiente", process.env.NODE_ENV)
// Na pasta request tem os exemplos das requisicoes 
// usando a extensao Rest Client

// usar o módulo express
const express = require('express');
//const bodyParser = require('body-parser');
//const morgan = require('morgan');
//const helmet = require('helmet');
//const cors = require(cors);


//inicializar
const app = express();

app.use('/blog', express.static('public'))
// portar
const PORT = 4000;

//analisar o corpo das solicitações com formato JSON
//app.use(express.json());

//log 
//app.use(morgan('common'));
//cabeçalhos de retorno (protencao do site, retirar identificacao do servidor)
//app.use(helmet());
//app.use(corsrs());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiv2 = require("./routes/api.v2.router");
app.use("/api/v2", apiv2);

const apiv1 = require("./routes/api.v1.router");
app.use("/api/v1", apiv1);

// inicializa servidor
app.get('/', (req , res) => {

  res.send(` <form method="POST">  
               <input type="text" name="nome">  
               <input type="submit" value="Ok">  
              </form>  
            `)

})

 app.listen(PORT, () => {
  console.log(`O Servidor está rodando na porta  `);  
 });


