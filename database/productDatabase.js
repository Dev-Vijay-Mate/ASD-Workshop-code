const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(__dirname, '..', 'db.json');

async function readProducts() {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const data = await fs.readFile(pathToFile, 'utf-8');
    return JSON.parse(data);
}

async function writeProducts(products) {
    await fs.writeFile(
        pathToFile,
        JSON.stringify(products, null, 2)
    );
}

module.exports = {
    readProducts,
    writeProducts
};