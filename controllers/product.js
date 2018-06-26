'use strict'
const Product = require('../models/product')

function getProduct (req, res){
	let productId = req.params.productId

	Product.findById(productId, (err, product) => {
		if (err) return res.status(500).send({message: `error al buscar producto: ${err}`})
		if (!product) return res.status(404).send({message: `el producto no existe`})

		res.status(200).send({ product })
	})
}

function getProducts (req, res){
	Product.find({},(err, products) =>{
		if(err) return res.status(500).send({message: `error al realizar la peticion :${err}`})
		if(!products) return res.status(404).send({message: `no existen productos`})
		
		res.send(200, { products })	
	})
}

function saveProduct(req, res){
	console.log('POST /api/product')
	console.log(req.body)

	let product = new Product()
	product.nombre = req.body.nombre
	product.foto = req.body.foto
	product.precio= req.body.precio
	product.categoria = req.body.categoria
	product.descripcion = req.body.descripcion

	product.save((err, productStored) =>{
		if (err) res.status(500).send({message: `Error al guardar los datos :${err} `})

		res.status(200).send({product: productStored})
	})
}

function updateProduct (req, res){
	let productId = req.params.productId
	let update = req.body

	Product.findByIdAndUpdate(productId, update, (err, productUpdate) =>{
		if (err) res.status(500).send({message: `Error al borrar producto :${err} `})
        res.status(200).send({product: productUpdate})
	
	})
}	

function deleteProduct (req, res){
	let productId = req.params.productId

	Product.findById(productId, (err, product) => {
		if (err) res.status(500).send({message: `Error al borrar producto :${err} `})

		product.remove(err => {
			if (err) res.status(500).send({message: `Error al borrar producto :${err} `})
			res.status(200).send({message: `el producto ha sido eliminado`})
		})
	})
}

module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct
}