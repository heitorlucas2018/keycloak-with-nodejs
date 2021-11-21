const router = require('express')();
const keycloak = require('../config/keyclock/keyclock').get();

router.get('/anonimous',(req, resp) => (resp.send("User anonimous")));

router.get('/user/info',
    keycloak.protect('user'),
    (req, resp) => (resp.send("<h1>Simple User</h1>")));

router.get('/admin/info',
    keycloak.protect('admin'),
    (req, resp) => (resp.send("<h1>Simple User</h1>")));

router.get('/search/cep/:cep',
    keycloak.protect('user'),
    (req, resp) => (resp.send(req.params.cep)));    

module.exports = router