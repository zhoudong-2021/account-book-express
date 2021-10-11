const express = require('express');
const router = express.Router();
const { getCategories } = require('../controller/categoriesController');

/* GET categories listing. */
router.get('/', function (req, res, next) {
    getCategories().then(data => {
        if(data){
            res.json(data);
            return;
        }
        console.log('Unable to get categories.')
    })
});

module.exports = router;