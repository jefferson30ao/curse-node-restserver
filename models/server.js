const express = require('express');
const { dbConnection } = require('../database/config');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        //llamada a conectarDB
        this.conectarDB();
        //Middelware
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
            this.app.use(this.usuariosPath, require('../routes/user'));
      }

    listen() {

            this.app.listen(this.port, () =>{
                console.log('Servidor corriendo en puerto ',this.port)
            })
    }

}

module.exports = Server;
