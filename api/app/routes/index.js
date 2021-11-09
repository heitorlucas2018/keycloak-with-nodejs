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
        this.getHelth();
        this.getWellcome();
        this.getMiddlewareKeyclock();
        this.getRoutesPath();
    }

    initSesion(session){
        if(session instanceof Function) {
            console.log('Creating initial sessions')
            this.__express.use(session({
                resave:true,
                saveUninitialized:true,
                secret:'e2673801-c4f0-4d9a-a92f-7993180903a6',
                cookie:{maxAge:3600000*24},
                store: this.__memoryStore
            })) 
        }
    }

    static start(express) {
        console.info('Creating routers')
        return new Router(express).__express
    }

    getMiddlewareKeyclock() {
        console.info('Creating middleware')
        return this.__express.use(this.__keyclock.middleware())
    }

    getWellcome() {
        return this.__express.get('/', (req, res) => {
            console.log(req.params)
            res.send('Hello word')
        });
    }

    getHelth() {
        return this.__express.get('/helth',(req, resp) => (resp.send({status:'up'})))
    }

    getRoutesPath() {
        console.info('Impl routers path')
        this.middleware('/admin/teste', require('../controller/ListController'))
        // this.__express.get('/admin',
        //     this.__keyclock.protect(['user']),
        //     require('../controller/ListController').get);
        // this.__express.get('/admin/teste', this.__keyclock.protect(['user','admin']),(req, resp) => (resp.send({status:'up'})))
    }

    middleware(path, controller, protect) {
        if(!protect) {
            console.log('create path')
         this.__express.use(path, function (req, res, next) {
            console.log('Request Type:', req.method);
                switch (req.method) {
                    case 'GET':
                            controller.get
                        break; 
                }
            next();
          });
        } else {
            this.__express.use(path,protect, function (req, res, next) {
                console.log('Request Type:', req.method);
                    switch (req.method) {
                        case 'GET':
                                controller.get
                            break; 
                    }
                next();
              });
        }
    }

}


module.exports = Router