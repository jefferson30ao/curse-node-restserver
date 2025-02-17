const express = require('express');
const { dbConnection } = require('../database/config');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
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
        // Middleware para configurar los encabezados de seguridad primero
        this.app.use((req, res, next) => {
            res.append("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
            res.append("Cross-Origin-Embedder-Policy", "unsafe-none");
            next();
        });
    
        // Habilitar CORS después
        this.app.use(cors());
    
        // Parseo y lectura del body
        this.app.use(express.json());
    
        // Directorio público
        this.app.use(express.static('public'));
    }
    
    

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {

            this.app.listen(this.port, () =>{
                console.log('Servidor corriendo en puerto ',this.port)
            })
    }

}

module.exports = Server;
