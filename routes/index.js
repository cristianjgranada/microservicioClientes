const { Router}= require('express');
const router = Router();

const objRegistrarCliente = require('../controllers/registrarCliente')
const objObtenerCliente = require('../controllers/obtenerClientes')
const objActualizarCliente = require('../controllers/actualizarCliente')
const objEliminarCliente = require('../controllers/eliminarCliente')

router.get('/clientes', objObtenerCliente.obtenerClientes  )

router.get('/clientes/:clienteid', objObtenerCliente.obtenerCliente  )

router.post('/clientes', objRegistrarCliente.registrarCliente) 

router.put('/clientes', objActualizarCliente.actualizarCliente  )

router.put('/clientes/actualizarurl' ,  objActualizarCliente.actualizarURLImagen )

router.delete('/clientes', objEliminarCliente.eliminarCliente  )

module.exports = router