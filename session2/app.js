const express = require('express');
const app = express();


require('./authors.routes')(app); 

app.listen(3000, () => console.log('Server running on port 3000'));