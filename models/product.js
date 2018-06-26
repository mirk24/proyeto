'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
	nombre: String,
	Foto: String,
	precio: {type: Number, default: 0},
	categoria: {type: String, enum: ['computadoras', 'celulares', 'accesorios']},
	descripcion: String
})

module.exports = mongoose.model('Product', ProductSchema)