const path = require('path');
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

    static start(express) {
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
        return this.__express.get('/helth',(req, resp) => (resp.send({status:'up'})))
    }

    getPaths() {
        console.info('Impl routers path')
        
        this.__express.get('/anonimous',(req, resp) => (resp.send("User anonimous")));
        
        const types_usser = ['user','admin'];

        if(types_usser instanceof Array) {
            types_usser.indexOf('user') > -1 ;
        } else if (types_usser === 'user')



        this.__express.get('/destroy',
            this.__keyclock.protect('user', 'admin'),(req, resp) => {
                req.session.destroy()
                resp.redirect('/');
            });

        this.__express.get('/user/info',
            this.__keyclock.protect('user'),
            (req, resp) => (resp.send("<h1>Simple User</h1>")));
        
        this.__express.get('/admin/info',
            this.__keyclock.protect('admin'),
            (req, resp) => (resp.send("<h1>Simple User</h1>")));

        //this.__express.use('/admin',this.__keyclock.protect(['user']), require('./routePaths'));
    }

}
module.exports = Router