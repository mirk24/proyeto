'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsuarioSchema = Schema({
	tipo_usuario: String,
	cargo: String,
	id_persona:(type: Schema.objectId, ref: "Persona")
})

module.exports = mongoose.model('Usuario', UsuarioSchema)