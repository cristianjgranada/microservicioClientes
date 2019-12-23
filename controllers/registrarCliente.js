const clsClientes = require('../clases/obtenerClientes')
const couchdb = require('../config/couchdb')
const clientemodel = require('../models/clientesModel')
const objClientes = {}

objClientes.registrarCliente = async(req,res) => {
    
    
    const validacion = clientemodel.validate (req.body)
    if (validacion.error){
        return res.json(
        {
            codigo: -98
            , mensaje: "fallo validacion en los parametros suministrados"
            , data: validacion.error.details[0].message 
        })
    }
    
    let resultado = await clsClientes.obtenerCliente(validacion.value.clienteid  )    
    if (resultado && resultado._id) {
        return res.json({'codigo': -98 , 'mensaje': 'Cliente ya existe', data: validacion.value })
    }else {
        let clientes = couchdb.db.use('clientes')
        clientes.insert(validacion.value)
        return res.json( {'codigo': 0 , 'mensaje': 'Cliente creado', data: validacion.value }  )
    }
}

module.exports = objClientes 