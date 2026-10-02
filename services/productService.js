const productDatabase = require('../database/productDatabase');

async function getAllProducts() {
    return await productDatabase.readProducts();
}

async function getProductById(id) {
    const products = await productDatabase.readProducts();
    return products.find(product => product.id === id);
}

async function createProduct(productData) {
    const products = await productDatabase.readProducts();
    const newId = products.length > 0
    ? Math.max(...products.map(product => product.id)) + 1
    : 1;
    const newProduct = {
        id: newId,
        name: productData.name,
        price: productData.price
    };
    products.push(newProduct);
    await productDatabase.writeProducts(products);
    return newProduct;
}

async function updateProduct(id, productData) {
    const products = await productDatabase.readProducts();
    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return null;
    }
    products[index] = {
        id: id,
        name: productData.name,
        price: productData.price
    };
    await productDatabase.writeProducts(products);
    return products[index];
}

async function patchProduct(id, productData) {
    const products = await productDatabase.readProducts();
    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return null;
    }
    products[index] = {
        ...products[index],
        ...productData,
        id: id
    };
    await productDatabase.writeProducts(products);
    return products[index];
}

async function deleteProduct(id) {
    const products = await productDatabase.readProducts();
    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return null;
    }
    const deletedProduct = products[index];
    products.splice(index, 1);
    await productDatabase.writeProducts(products);
    return deletedProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
