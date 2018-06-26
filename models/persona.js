'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonaSchema = Schema({
	nombre: String,
	ape_pat: String,
	ape_mat: String,
	ci: String,
	telefono: Number,
	direccion: String
})

module.exports = mongoose.model('Persona', PersonaSchema)