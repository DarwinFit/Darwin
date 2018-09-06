const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const routes = require('./routes.js');

const app = express();

//serve up static folder
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

//use routes
app.use('/health', routes);

app.get('/*', (req, res) => {
  axios.get('/')
       .then((response) => {
         console.log("[server] Pretending like routing to the endpoint");
       })
       .catch((err) => {
         console.error(err);
       });
})

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});