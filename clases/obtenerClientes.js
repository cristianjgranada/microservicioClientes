const couchdb = require('../config/couchdb')
const clsCliente = {}

clsCliente.obtenerCliente = async(clienteId )=> {
    if (clienteId){
        console.log("cliente a buscar" , clienteId );
        let clientes = couchdb.db.use('clientes')
        let result = await clientes.find({
            "selector": {
                "clienteid": {
                    "$eq": clienteId
                }
            }
         } )
         if (! result.docs[0] ){
            return {codigo:-95, mensaje: 'Cliente no encontrado'}
         }else {
            return  result.docs[0] 
         }
         
    }else {
        return {}
    }
}

clsCliente.obtenerClientes = async()=> {
    let clientes = couchdb.db.use('clientes')
    let result = await clientes.find({
        "selector": {
            "clienteid": {
                "$gt": null
            }
        }
     } )
     return result
}

module.exports = clsCliente