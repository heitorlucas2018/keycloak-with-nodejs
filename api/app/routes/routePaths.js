const router = require('express')();
const keycloak = require('../config/keyclock/keyclock').get();

const handlerResponseInfo = (type, value) => ({
    type: type,
    description: value
}) 

router.get('/anonymous',
            (req, resp) => (resp.send(handlerResponseInfo('anonymous', 'Anonymous User'))));

router.get('/user/info',
    keycloak.protect('user'),
    (req, resp) => (resp.send(handlerResponseInfo('user', 'Simple User'))));

router.get('/admin/info',
    keycloak.protect('admin'),
    (req, resp) => (resp.send(handlerResponseInfo('admin', 'Simple Admin'))));

router.get('/search/cep/:cep',
    keycloak.protect(['user','admin']),
    (req, resp) => (resp.send(req.params.cep)));    

module.exports = router