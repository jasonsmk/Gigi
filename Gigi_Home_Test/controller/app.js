const express = require("express");
const app = express();
const validator = require("validator");

//import the models
const product = require("../model/product");

//apply middleware
app.use(express.json(), express.urlencoded({ extended: false })); //allow JSON or urlencoded format

app.all('*', (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//get all products based on page number and rows per page, empty values will assume all products are returned
app.get('/api/product', (req, res) => {
    console.log(`getListOfProducts() called ${new Date()}`);
    var page = req.query.page || '0'; //must be integer 
    var rows = req.query.rows || '0'; //must be integer
    var category = req.query.category || ''; //only alpha or empty spaces allowed
    var sortPriceHighToLow = req.query.sortPriceHighToLow || '0'; //only integer, <=-1 sort by ASC, ==0 no sorting, >=1 sort by DESC
    var priceBelow = req.query.priceBelow || '0'; //only float, <=0 will omit price filter

    var jsonError = {};
    if (!(typeof parseInt(page) === "number" && validator.isInt(page, { min: 0 }))) {
        jsonError.page = 'Invalid page input, only values >=0 allowed.';
    }
    if (!(typeof parseInt(rows) === "number" && validator.isInt(rows, { min: 0 }))) {
        jsonError.rows = 'Invalid rows input, only values >=0 allowed.';
    }
    if (!(typeof category === "string" && validator.matches(category, /^[a-zA-Z ]*$/))) {
        jsonError.category = 'Only empty/alphabets allowed.';
    }
    if (!(typeof parseInt(sortPriceHighToLow) === "number" && validator.isInt(sortPriceHighToLow, { min: -1, max: 1 }))) {
        jsonError.sortPriceHighToLow = 'Invalid sortPriceHighToLow input, only -1, 0, 1 allowed.';
    }
    if (!(typeof parseInt(priceBelow) === "number" && validator.isInt(priceBelow, { min: 0 }))) {
        jsonError.priceBelow = 'Invalid priceBelow input, only integer values >=0 allowed. Input 0 to omit price filter.';
    }
    if (Object.keys(jsonError).length != 0) {
        return res.status(400).send(jsonError);
    }

    product.getListOfProducts(page, rows, category, sortPriceHighToLow, priceBelow, (error, result) => {
        if (error) {
            console.log(`Error: getListOfProducts()\n ${error}`);
            return res.status(500).send(error);
        } else {
            return res.status(200).send(result);
        }
    });
});

//get product by id
app.get('/api/product/:id', (req, res) => {
    console.log(`getProductById() called ${new Date()}`);

    var jsonError = {};
    if (!(typeof parseInt(req.params.id) === "number" &&
        validator.isInt(req.params.id, { min: 1 })
    )) {
        jsonError.id = 'Invalid product id format.';
    }
    if (Object.keys(jsonError).length != 0) {
        return res.status(400).send(jsonError);
    }

    product.getProductById(req.params.id, (error, result) => {
        if (error) {
            console.log(`Error: getProductById()\n ${error}`);
            res.status(500).send(error);
        } else {
            res.status(200).send(result);
        }
    });
});

//insert new product
app.post('/api/product', (req, res) => {
    console.log(`insertProduct() called ${new Date()}`);

    var jsonError = {};
    if (!(typeof req.body.name === "string" &&
        validator.matches(req.body.name, /^[a-z0-9 ]+$/i) &&
        validator.isByteLength(req.body.name, { min: 1, max: 255 }
        ))) {
        jsonError.name = 'Only alphanumeric. Length must be between 1 and 255.';
    }
    if (!(typeof req.body.description === "string" &&
        validator.isByteLength(req.body.description, { min: 1, max: 255 })
    )) {
        jsonError.description = 'Length must be between 1 and 255.';
    }
    if (!(typeof parseFloat(req.body.price) === "number" &&
        validator.isDecimal(`${req.body.price}`, {decimal_digits: '0,2'})
        //validator.matches(`${req.body.price}`, /^\d+\.\d{0,2}$/)
    )) {
        jsonError.price = 'Invalid price format.';
    }
    if (!(typeof req.body.image === "string" &&
        validator.isByteLength(req.body.image, { min: 1, max: 255 })
    )) {
        jsonError.image = 'Length must be between 1 and 255.';
    }
    if (!(typeof req.body.sku === "string" &&
        validator.isAlphanumeric(req.body.sku) &&
        validator.isByteLength(req.body.sku, { min: 1, max: 45 })
    )) {
        jsonError.sku = 'Only alphanumeric. Length must be between 1 and 45.';
    }
    if (!(typeof req.body.category === "string" &&
        validator.isAlpha(req.body.category) &&
        validator.isByteLength(req.body.category, { min: 1, max: 45 })
    )) {
        jsonError.category = 'Only alphabets. Length must be between 1 and 45.';
    }
    if (Object.keys(jsonError).length != 0) {
        return res.status(400).send(jsonError);
    }

    product.insertProduct(req.body, (error, productID) => {
        if (error) {
            console.log(error);
            if (error.code === 'ER_DUP_ENTRY') {
                console.log(error);
                jsonError.sku = `Duplicate entry detected`;
                return res.status(409).send(jsonError);
            };
            return res.status(500).send(error);
        };
        return res.status(201).send({ productID });
    });
});

module.exports = app;