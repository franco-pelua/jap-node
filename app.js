const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send(
    '<h1 style="font-family: Arial; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; margin: 0; padding: 0;">JAP server up & running!</h1>'
));

app.get('/cats/cat.json', (req, res) => res.json(require('./cats/cat.json')));

app.get('/cats_products/:id', (req, res) => {
    try {
        res.json(require(`./cats_products/${req.params.id}`))
    } catch (error) {
        res.status(404).send('Resource cannot be found');
    }
});

app.get('/products/:id', (req, res) => {
    try {
        res.json(require(`./products/${req.params.id}`));        
    } catch (error) {
        res.status(404).send('Resource cannot be found');
    }
});

app.get('/products_comments/:id', (req, res) => {
    try {
        res.json(require(`./products_comments/${req.params.id}`));        
    } catch (error) {
        res.status(404).send('Resource cannot be found');
    }
})

app.get('/user_cart/:id', (req, res) => {
    try {
        res.json(require(`./user_cart/${req.params.id}`));
    } catch (error) {
        res.status(404).send('Resource cannot be found');
    }
})

app.post('/cart/buy.json', (req, res) => {
    // Se asume que si la petición llego al servidor, la compra es válida. En un contexto real, haría una verificación del lado del servidor también. 
    // En este caso, voy a valerme únicamente de la validación del lado del cliente. 

    const items_bought = req.body; // Objeto con la información de la venta
    const sales = JSON.parse(fs.readFileSync('./sales/sales.json').toString());

    sales.push(items_bought);

    fs.writeFile('./sales/sales.json', JSON.stringify(sales), err => {
        if (err) return console.error(err);
        res.send('Sale saved succesfully');
    });
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
