let express = require("express");//Importar express
let server = express(); // Invocar express

server.use(express.json());
// nombre, correo, contrasena, id (identificador unico que se incrementa)
//objetos permiten agrupar propiedades

var allowCrossDomain = function(req, res, next) { // esto es para quitar el error de CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
server.use(allowCrossDomain); // esto es para quitar el error de CORS

let anny= {id:1,nombre:"Anny",correo: "anny.hernandez211@gmail.com",contrasena:"12345"}

let usuarios = [anny];

server.get("/usuarios", (req,res,next)=>{ //peticion, respuesta,siguiente
    res.json(usuarios);
});

function validarInfoCompleta(req, res, next){

    let nombreReq = req.body.nombre;
    let correoReq = req.body.correo
    let contrasenaReq = req.body.contrasena

    if(nombreReq && correoReq && contrasenaReq){
        next();
    }
    else{
        res.status(400) // Bad request 
        res.json({message:"envie la info completa"})
    }
}

server.post("/usuarios", validarInfoCompleta, (req, res, next) => {  //peticion, respuesta, siguiente
    //req.body  aca queda la informacion envuiada por el cliente
    //req.params parametros tipicamente para filtrar
    //req.path log
    //req.method logs
    //req.headers Autenticacion 
    //indice
    //    0       1
    // ["Anny", "Melany" ]
    let primerusuario = usuarios[0];///

    let ultimoUsuario = usuarios[usuarios.length-1]; //obteniendo el ultimo elemento del arreglo

    let nuevoUsuario = req.body;
    nuevoUsuario.id = ultimoUsuario.id+1; //id autoincremental

    usuarios.push(nuevoUsuario);    
   
    res.json(usuarios);
});

server.listen(3000,()=> { // Para que escuche y siempre debe ir al final del codigo
console.log("Ya estoy escuchando");
});