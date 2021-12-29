const Joi = require('@hapi/joi') 
const authschemas = Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().email().lowercase().required(),
    password:   Joi.string().min(4).required()


})
module.exports = {
    authschemas
}
