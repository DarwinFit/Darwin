const expresss = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

const app = express();

//serve up static folder
app.use(express.static(__dirname + '../client/dist'));
app.use(bodyParser.json());

//use routes
app.use('/health', routes);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});