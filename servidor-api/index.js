const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { finalizePurchase, getCitiesByState } = require('./controllers/mini-eccomerce.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/mini-ecommerce/checkout/finalize-purchase', finalizePurchase);

app.get('/mini-ecommerce/state/:abbreviationState/cities', getCitiesByState);


app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`));