const clsclientes = require('../clases/obtenerClientes')
const couchdb = require('../config/couchdb')

const objClientes = {}


objClientes.eliminarCliente = async (req,res) => {
    let clienteId =  req.query.clienteid;
    if (!clienteId){
        return res.json({codigo:-99, mensaje:'parametros insuficientes'})
    }
    let resultado = await clsclientes.obtenerCliente(clienteId)
    if(resultado){
        let clientes = couchdb.use('clientes')
        let _id =  resultado._id ;
        let _rev = resultado._rev
        await clientes.destroy(_id,_rev)
        return res.json( { codigo: 0, mensaje:'Cliente eliminado', data:  resultado})
    }else {
        return res.json({codigo:-98, mensaje:'No existe el elemento a eliminar'})
    }
}

module.exports = objClientes