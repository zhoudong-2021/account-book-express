const {exec} = require('../db/mysql');

const getCategories = () => {
    let sql = `select * from categories`;
    return exec(sql);
}

module.exports = {
    getCategories
}