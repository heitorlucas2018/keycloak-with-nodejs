module.exports = class {
    static get(req, res) {
        res.send([{teste: 'teste 01'}])
    }
    static post(req, res) {
        res.send([{teste: 'teste 01'}])
    }
    static delete(req, res) {
        res.send([{teste: 'teste 01'}])
    }
}