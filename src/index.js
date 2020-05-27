const express = require('express');
require('./database');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server up on port ' + port);
});