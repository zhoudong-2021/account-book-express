const {exec, escape} = require('../db/mysql');
const { genPassword } = require('../utility/crypto');

const getUserById = (username, password) => {
    username = escape(username);
    password = genPassword(password);
    let sql = `select username from users where username=${username} and password='${password}'`;
    return exec(sql).then(rows => {
        return rows[0] || {};
    }).catch(err => {
        console.log(err);
        return {};
    })
}

const addUser = (username, password) => {
    username = escape(username);
    password = genPassword(password);
    const sql = `insert into users(username, password) values (${username}, '${password}'); `
    return exec(sql);
}

const getUserByName = (username) => {
    username = escape(username);
    const sql = `select username from users where username=${username}`;
    return exec(sql).then(data => {
        return data[0] || {};
    })
}

module.exports = {
    getUserById,
    addUser,
    getUserByName
}