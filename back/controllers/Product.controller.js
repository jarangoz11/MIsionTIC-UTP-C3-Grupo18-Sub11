const productModel = require("../models/Product.model");

module.exports = class ProductController {
    static async getAll(req, res) {
        try {
            const products = await productModel.find();
            res.status(200).json(products);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async getByCode(req, res) {
        try {
            const code = req.params.code;
            const product = await productModel.findOne({ "code": code });
            if (product == null) {
                res.status(404).json({ message: "No encontrado en la base de datos" });
            } else {
                res.status(200).json(product);
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async create(req, res) {
        try {
            let product = req.body;
            product = await productModel.create(product);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: err.message });
        }
    }

    static async update(req, res) {
        try {
            const code = req.params.code;
            const product = req.body;
            await productModel.updateOne({ code: code }, product);
            res.status(200).json()
        } catch (error) {
            res.status(400).json({ message: err.message })
        }
    }
    static async delete(req, res) {
        try {
            const code = req.params.code;
            await productModel.deleteOne({ code: code });
            res.status(200).json();
        } catch (error) {
            res.status(400).json({ message: err.message });
        }
    }

}