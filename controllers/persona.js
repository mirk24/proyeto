'use strict'
const Persona = require('../models/persona')

function getPersona (req, res){
	let personaId = req.params.personaId

	Persona.findById(personaId, (err, persona) => {
		if (err) return res.status(500).send({message: `error al buscar la persona: ${err}`})
		if (!persona) return res.status(404).send({message: `la persona no existe`})

		res.status(200).send({ persona })
	})
}

function getPersonas (req, res){
	Persona.find({},(err, personas) =>{
		if(err) return res.status(500).send({message: `error al realizar la peticion :${err}`})
		if(!personas) return res.status(404).send({message: `no existen personas registradas`})
		
		res.send(200, { personas })	
	})
}

function savePersona(req, res){
	console.log('POST /api/persona')
	console.log(req.body)

	let persona = new Persona()
	persona.nombre = req.body.nombre
	persona.ape_pat = req.body.ape_pat
	persona.ape_mat= req.body.ape_mat
	persona.ci = req.body.ci
	persona.telefono = req.body.telefono
	persona.direccion = req.body.direccion

	persona.save((err, personaStored) =>{
		if (err) res.status(500).send({message: `Error al guardar los datos :${err} `})

		res.status(200).send({persona: personaStored})
	})
}

function updatePersona (req, res){
	let personaId = req.params.personaId
	let update = req.body

	Persona.findByIdAndUpdate(personaId, update, (err, personaUpdate) =>{
		if (err) res.status(500).send({message: `Error al actualizar persona :${err} `})
        res.status(200).send({persona: personaUpdate})
	
	})
}	

function deletePersona (req, res){
	let personaId = req.params.personaId

	Persona.findById(personaId, (err, persona) => {
		if (err) res.status(500).send({message: `Error al borrar persona :${err} `})

		persona.remove(err => {
			if (err) res.status(500).send({message: `Error al borrar persona :${err} `})
			res.status(200).send({message: `la persona ha sido eliminada`})
		})
	})
}

module.exports = {
	getPersona,
	getPersonas,
	savePersona,
	updatePersona,
	deletePersona
}