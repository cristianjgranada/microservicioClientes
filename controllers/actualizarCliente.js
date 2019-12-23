const couchdb = require('../config/couchdb')
const clsClientes = require('../clases/obtenerClientes')
const clientemodel = require('../models/clientesModel')
const httprequest = require('./httpRequest')



const objClientes = {}

objClientes.actualizarCliente = async (req,res ) => {
    let validacion = clientemodel.validate( req.body)
    if (validacion.error){
        return res.json(
            {
                codigo: -98
                , mensaje: "fallo validacion en los parametros suministrados"
                , details: validacion.error.details[0].message 
            })
    }
    let resultado = await clsClientes.obtenerCliente(validacion.value.clienteid)    
    if (resultado){
        validacion.value._id = resultado._id
        validacion.value._rev = resultado._rev
        let clientes = couchdb.db.use('clientes')
        await  clientes.insert(  validacion.value )
        return res.json({'codigo': 0 , 'mensaje': 'Cliente Actualizado', data: validacion.value } )
    }else { 
        return res.json({'codigo': -98 , 'mensaje': 'No se pudo actualizar, El cliente no existe'} )
    }
}

objClientes.actualizarURLImagen = async(req,res)=> {
    let clienteid = req.body.id
    let url = req.body.url
    let resultado = await clsClientes.obtenerCliente(clienteid)
    resultado.urlimagen = url
    let clientes = couchdb.db.use('clientes')
    await clientes.insert(resultado)
    return res.json({codigo:0 , mensaje: 'Cliente actualizado', data: resultado })
}

module.exports = objClientes