'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const personaCtrl = require('../controllers/persona')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productId', productCtrl.updateProduct )
api.delete('/product/:productId', productCtrl.deleteProduct)

api.get('/persona', personaCtrl.getPersonas)
api.get('/persona/:personaId', personaCtrl.getPersona)
api.post('/persona', personaCtrl.savePersona)
api.put('/persona/:personaId', personaCtrl.updatePersona )
api.delete('/persona/:personaId', personaCtrl.deletePersona)

api.post('/singup', userCtrl.singUp)
api.post('/singin', userCtrl.singIn)

api.get('/private', auth, (req, res) =>{
	res.status(200).send({message: 'tienes acceso'})
})

module.exports = api