const Joi = require('@hapi/joi')

module.exports = Joi.object().keys({
    clienteid: Joi.string().alphanum().min(3).max(30).required()
    ,tipoclienteid: Joi.string().required()
    ,nombre: Joi.string().required()
    ,apellido: Joi.string().required()
    ,edad: Joi.number()
    ,cumpleanos: Joi.date()
    ,urlimagen: Joi.string().allow(null)
})