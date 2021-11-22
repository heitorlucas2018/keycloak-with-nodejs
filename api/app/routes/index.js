const path = require('path');
const cors = require('cors');

class Router {
    __express;
    __keyclock;
    __memoryStore;

    constructor(express = require('express')(), 
                keyclock = require('../config/keyclock/keyclock'),
                session = require('express-session')) {
        this.__express = express;
        this.__memoryStore = new session.MemoryStore()
        
        this.initSesion(session);
        this.__keyclock = new keyclock().init(this.__memoryStore);
        this.bootstrap();
    }

    bootstrap() {
        this.__express.use(cors());
        this.getHelth();
        this.getWellcome();
        this.getMiddlewareKeyclock();
        this.getPaths();
    }

    initSesion(session){
        if(session instanceof Function) {
            console.log('Creating initial sessions')
            this.__express.use(session({
                resave:true,
                saveUninitialized:true,
                secret:'mySecret',
                cookie:{maxAge:3600000*24},
                store: this.__memoryStore
            })) 
        }
    }

    static builder(express) {
        console.info('Creating routers')
        return new Router(express).__express
    }

    getMiddlewareKeyclock() {
        console.info('Creating middleware')
        return this.__express.use(this.__keyclock.middleware({
            logout: '/logout',
            admin: '/'
          }))
    }

    getWellcome() {
        return this.__express.get('/', (req, res) => {
            res.sendFile(path.join('/application/app/view/wellcome.html'));
        });
    }

    getHelth() {
        return this.__express.get('/api/v1/helth',(req, resp) => (resp.send({status:'up'})))
    }

    getPaths() {
        console.info('Impl routers path')
        //this.__express.use('/api/v1',this.__keyclock.protect(['user','admin']), require('./routePaths'));
        this.__express.use('/api/v1', require('./routePaths'));
    }

}
module.exports = Router