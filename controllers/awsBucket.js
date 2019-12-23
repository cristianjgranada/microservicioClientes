const aws = require('aws-sdk')
const fs = require('fs')
var proxy = require('proxy-agent');
const objS3 = {}

aws.config.update({
    httpOptions: { agent: proxy('http://hermes.pragma.com.co:8080') },
    accessKeyId: 'AKIA6ODAEJI4UZVD7EUJ',
    secretAccessKey: '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',
    region: 'us-east-2'
})
 
const s3 = new aws.S3()

objS3.cargarImagen = (tipo, rutaImagen, nombreArchivo) => {     
    let bucket;
    (tipo === 'Clientes') ? 
        bucket = 'imagenesclientes-proyectostore' 
    :   bucket = 'imagenesproductos-proyectostore'
    console.log( bucket );
    s3.upload ({
        Bucket:bucket,
        Body: fs.readFileSync( `./uploads/${nombreArchivo}`),
        Key: nombreArchivo
    }, (err,data) => {
        if (err){
            return {codigo: -99, mensaje:  `Error al cargar el Archivo ${nombreArchivo}`, err}
        }else {
            return {codigo: 0, mensaje:  `Archivo ${nombreArchivo} cargado correctamente`, data}
        }
    } )
}

objS3.obtenerImagen =  (tipo, nombreArchivo) => {
    return new Promise((resP,rej) => {
        console.log(nombreArchivo);
        let bucket;
        (tipo === 'Clientes') ? 
            bucket = 'imagenesclientes-proyectostore' 
        :   bucket = 'imagenesproductos-proyectostore' 
        const params = {
            Bucket: bucket,
            Key: nombreArchivo
        }
        var pathToSave = './uploads/'+params.Key;
        var tempFile = fs.createWriteStream(pathToSave);
        var stream =  s3.getObject(params).createReadStream().pipe(tempFile)
        var had_error = false;
          stream.on('error', function(err){
            had_error = true;
            rej( {codigo: -99, mensaje:  `Error al leer el Archivo ${nombreArchivo}`, err})
          });
          stream.on('close', function(){
            if (!had_error) {
              resP( {codigo: 0, mensaje:  `Archivo ${nombreArchivo} leido correctamente`, pathToSave})
            } 
          });
    })
}

objS3.obtenerURL = (tipo, nombreArchivo)=>{
    let bucket;
    (tipo === 'Clientes') ? 
        bucket = 'imagenesclientes-proyectostore' 
    :   bucket = 'imagenesproductos-proyectostore' 
    const params = {
        Bucket: bucket,
        Key: nombreArchivo + ".png"
    }

    return s3.getSignedUrl('getObject', params )
}


module.exports = objS3