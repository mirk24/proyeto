'use strict'

//const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function singUp(req, res){
	const user = new User({
		email: req.body.email,
		dname: req.body.dname,
		password: req.body.password
	})

	user.save((err) =>{
		if (err) res.status(500).send({message: `error al crear usuario: ${err}`})

		return res.status(201).send({token: service.createToken(user)})	
	})
}

function singIn(req, res){
	User.find({ email: req.body.email }, (err, user) =>{
		if(err) return req.status(500).send({message: err})

		if (!user) return res.status(404).send({message: 'no existe usuario'})

		req.user = user
		res.status(200).send({
			message: 'te has logueado correctamente',
			token: service.createToken(user)
		}) 	
	})
}

module.exports = {
	singUp,
	singIn
}