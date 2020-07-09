const express = require('express')
var mustacheExpress = require("mustache-express");
let bodyParser = require("body-parser");
const fetch = require('node-fetch');

const app = express();
const port = 3000;

const cart = [];

// Register '.mustache' extension with The Mustache Express
app.set("views", `${__dirname}/views`);
app.set("view engine", "mustache");
app.engine("mustache", mustacheExpress());
app.use(bodyParser.json());

app.get('/', async(req, res) => {
  try {
    const response = await fetch(
      "https://maya-api.azurewebsites.net/api/Products"
    );
    const items = await response.json();
    res.render("app", {
      header: "my header",
      items: items,
    });
  } catch(ex) {
    console.info(ex);
    res.render("app", {
      header: "my header",
      items: [],
    });
  }
})

app.post('/add', (req, res) => {
  console.log('id', req.body.id);

  // TODO push to cart
  res.json(`${res.body.id} added to cart`)
})

app.post('/checkout', async(req, res) => {
  const id = '<TODO read item from cart>'

  const response = await await fetch('https://maya-api.azurewebsites.net/api/Shop', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: '<TODO>' })
  });
  // const json = await response.json();
  const json = await response.json(); 
  console.log('json', json)
  res.json(json)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))