const { exec } = require('../db/mysql');

const getItems = (username) => {
    let sql = `select * from items where username='${username}' order by date desc`;
    return exec(sql);
}

const getItemWithId = (id) => {
    let sql = `select * from items where id=${id}`;
    return exec(sql);
}

const addItem = (body, username) => {
    let { id, title, amount, monthCategory, date, cid } = body; 
    let sql = `insert into items (id, title, amount, monthCategory, date, cid, username) 
    values (${id}, '${title}', ${amount}, '${monthCategory}', '${date}', '${cid}', '${username}')`;
    return exec(sql);
}

const updateItem = (id, body) => {
    let { title, amount, monthCategory, date, cid } = body;
    let sql = `update items set amount=${amount}, title='${title}', 
    monthCategory='${monthCategory}', date='${date}', cid='${cid}' where id='${id}'`;
    return exec(sql);
}

const deleteItem = (id) => {
    let sql = `delete from items where id=${id}`;
    return exec(sql);
}

module.exports = {
    getItems,
    getItemWithId,
    addItem,
    updateItem,
    deleteItem
}