const clsClientes = require('../clases/obtenerClientes')
const objClientes = {}
const s3 = require('../controllers/awsBucket')
const path = require('path');


objClientes.obtenerClientes = async (req,res ) => {
    let data =  await clsClientes.obtenerClientes()
    res.json( data.docs)
}

objClientes.obtenerCliente = async (req,res ) => {
    let clienteId = req.params.clienteid
    if (!clienteId){
        return res.json({codigo:-98, mensaje: 'parametros insuficiente'})
    }else {
        let data =  await clsClientes.obtenerCliente(clienteId)
        res.json(data)
    }
}
/* 
objClientes.obtenerImagen = async (req,res ) => {
    let clienteId = req.params.clienteid
    s3.obtenerImagen("Clientes",clienteId + ".png" )
    .then(respuesta => {
        res.sendFile(path.resolve(__dirname, `../uploads/${clienteId}.png` ))
    })
    .catch(error=> {
        res.json ( error)
    })
} */

/* objClientes.obtenerURL = (req,res)=>{
    let clienteId = req.params.clienteid
    let url = s3.obtenerURL("Clientes", clienteId )
    if (url) {
        let vec = url.split('?')
        res.send(vec[0])
    }else {
        res.json({codigo: -99, mensaje: 'error'})
    }
} */

module.exports = objClientes 