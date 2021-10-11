const express = require('express');
const router = express.Router();
const {
    getItems,
    getItemWithId,
    addItem,
    updateItem,
    deleteItem
} = require('../controller/itemsController');
const loginCheck = require('../middleware/loginCheck');

/* GET items listing. */
router.get('/', loginCheck, function (req, res, next) {

    getItems(req.session.username).then(data => {
        res.json(data);
    })
});

/* GET an item with id. */
router.get('/:id', function (req, res, next) {
    id = req.params.id;
    getItemWithId(id).then(data => {
        res.json(data);
    })
});

/* Update an item with id. */
router.put('/:id', function (req, res, next) {
    updateItem(req.params.id, req.body).then(data => {
        if (data.affectedRows === 1)
            res.json(true);
        else
            console.log("Unable to update the item.");
    })

});

/* Create a new item. */
router.post('/',loginCheck, function (req, res, next) {
    
    addItem(req.body, req.session.username).then(data => {
        if (data.affectedRows === 1)
            res.json(true);
        else
            console.log("Unable to create a new item.");
    })
});

/* Delete an item with id. */
router.delete('/:id', function (req, res, next) {
    deleteItem(req.params.id).then(data => {
        if (data.affectedRows === 1)
            res.json(true);
        else
            console.log("Unable to delete the item.");
    })
    
});

module.exports = router;