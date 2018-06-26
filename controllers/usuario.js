'use strict'
const Usuario = require('../models/usuario')

function getUsuario (req, res){
	let usuarioId = req.params.usuarioId

	Usuario.findById(usuarioId, (err, usuario) => {
		if (err) return res.status(500).send({message: `error al buscar la usuario: ${err}`})
		if (!usuario) return res.status(404).send({message: `el usuario no existe`})

		res.status(200).send({ usuario })
	})
}

function getUsuarios (req, res){
	Usuario.find({},(err, usuarios) =>{
		if(err) return res.status(500).send({message: `error al realizar la peticion :${err}`})
		if(!usuarios) return res.status(404).send({message: `no existen usuarios registradas`})
		
		res.send(200, { usuarios })	
	})
}

function saveUsuario(req, res){
	console.log('POST /api/usuario')
	console.log(req.body)

	let usuario = new Usuario()
	usuario.tipo_usuario = req.body.tipo_usuario
	usuario.cargo = req.body.cargo
	

	usuario.save((err, usuarioStored) =>{
		if (err) res.status(500).send({message: `Error al guardar los datos :${err} `})

		res.status(200).send({usuario: usuarioStored})
	})
}

function updateUsuario (req, res){
	let usuarioId = req.params.usuarioId
	let update = req.body

	Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdate) =>{
		if (err) res.status(500).send({message: `Error al actualizar usuario :${err} `})
        res.status(200).send({usuario: usuarioUpdate})
	
	})
}	

function deleteUsuario (req, res){
	let usuarioId = req.params.usuarioId

	Usuario.findById(usuarioId, (err, usuario) => {
		if (err) res.status(500).send({message: `Error al borrar usuario :${err} `})

		usuario.remove(err => {
			if (err) res.status(500).send({message: `Error al borrar usuario :${err} `})
			res.status(200).send({message: `el usuario ha sido eliminada`})
		})
	})
}

module.exports = {
	getUsuario,
	getUsuarios,
	saveUsuario,
	updateUsuario,
	deleteUsuario
}