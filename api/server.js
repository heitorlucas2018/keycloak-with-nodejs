require('dotenv').config();
const express = require('./app/routes').start();
//const RoutesPath = ;
const port = process.env.PORT || 3001;
express.listen(port, () => {
    console.info(`Starting server ${port} - exemple app listner`)
})