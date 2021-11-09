module.exports = class {
    static get(req, res) {
        console.log(req.kauth.grant.access_token)
        res.send([{teste: 'teste 01'}])
    }
    static post(req, res) {
        res.send([{teste: 'teste 01'}])
    }
    static delete(req, res) {
        res.send([{teste: 'teste 01'}])
    }
}