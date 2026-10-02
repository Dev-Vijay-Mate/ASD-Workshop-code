const productService = require('../services/productService');
const cacheService = require('../services/cacheService');

async function getAllProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        cacheService.setCache(req.cacheKey, products);
        return res.json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error reading products'
        });
    }
}

async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: 'Invalid product id'
            });
        }
        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        cacheService.setCache(req.cacheKey, product);
        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error reading product'
        });
    }
}

async function createProduct(req, res) {
    try {
        const { name, price } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({
                message: 'name and price are required'
            });
        }
        const product = await productService.createProduct({
            name,
            price
        });
        cacheService.clearCache();
        return res.status(201).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error creating product'
        });
    }
}

async function updateProduct(req, res) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: 'Invalid product id'
            });
        }
        const { name, price } = req.body;
        const product = await productService.updateProduct(id, {
            name,
            price
        });

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        cacheService.clearCache();
        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error updating product'
        });
    }
}

async function patchProduct(req, res) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: 'Invalid product id'
            });
        }
        const product = await productService.patchProduct(
            id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        cacheService.clearCache();
        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error updating product'
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: 'Invalid product id'
            });
        }
        const product = await productService.deleteProduct(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        cacheService.clearCache();
        return res.json({
            message: 'Product deleted successfully',
            product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error deleting product'
        });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
