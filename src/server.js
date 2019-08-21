const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.port || 8810;
const app = express();
const protectedRoutes = require('./routes/protected')
const publicRoutes = require('./routes/public')

app.use(bodyParser.json());

publicRoutes(app);
protectedRoutes(app);

app.listen(port, ()=>{
    console.log(`App listening on ${port}`)
})



