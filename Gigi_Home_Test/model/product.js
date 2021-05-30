const db = require("../db/dbConfig");
const product = {
    getListOfProducts: (page, rows, category, sortPriceHighToLow, priceBelow, callback) => {
        let selectProductByCategorySQL = `SELECT p.* FROM product p WHERE p.category LIKE ? `;
        priceBelow = (priceBelow > 0) ? priceBelow : 0;
        let priceBelowSQL = priceBelow === 0 ? `AND price >= ? ` : `AND price <= ? `
        let orderByPriceSQL = sortPriceHighToLow == 0 ? '' : (sortPriceHighToLow > 0 ? `ORDER BY p.price DESC ` : `ORDER BY p.price ASC `);
        let limitoffsetSQL = `LIMIT ?,?`;
        let limit = (page - 1) * rows;
        let offset = parseInt(rows);

        if (page <= 0 || rows <= 0) {
            limit = 0;
            offset = 0;
            limitoffsetSQL = '';
        }

        let searchSQL = selectProductByCategorySQL + priceBelowSQL + orderByPriceSQL + limitoffsetSQL;
        let resultObj = {}; //create an object to clone result to be returned

        console.log(`Search SQL query: ${searchSQL}`);

        db.query(searchSQL, [`%${category}%`, priceBelow, limit, offset], (error, productList) => {
            if (error) {
                return callback(error, null);
            } else {
                resultObj.results = productList;
                let countRecordsSQL = `SELECT CONVERT(CEILING(COUNT(*)/?), SIGNED) as totalPages FROM product p WHERE p.category LIKE ? ${priceBelowSQL};`;
                db.query(countRecordsSQL, [offset, `%${category}%`, priceBelow], (error, totalPages) => {
                    if (error) {
                        return callback(error, null);
                    }
                    resultObj.pageCount = totalPages.length > 0 ? totalPages[0] : 0;
                    return callback(null, resultObj);
                });
            }
        });
    },
    getProductById: (id, callback) => {
        const sql = `SELECT * FROM product WHERE id = ?;`;
        db.query(sql, [id], (error, result) => {
            return error ? callback(error, null) : callback(null, result);
        });
    },
    insertProduct: (product, callback) => {
        //name, description, price, image, sku, category
        const sql = `INSERT INTO product (name, description, price, image, sku, category) VALUES (?, ?, ?, ?, ?, ?);`;
        db.query(sql, [product.name, product.description, product.price, product.image, product.sku, product.category], (error, result) => {
            if (error) {
                return callback(error, null);
            };
            return callback(null, result.insertId);
        });
    }
}
module.exports = product;