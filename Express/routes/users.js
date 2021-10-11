var express = require('express');
const { getUserById, addUser, getUserByName } = require('../controller/usersController');
const registerCheck = require('../middleware/registerCheck');
var router = express.Router();


/* User login. */
router.get('/', function (req, res, next) {
  const username = req.query.username;
  const password = req.query.password;
  getUserById(username, password)
    .then(data => {
      if (data.username) {
        req.session.username = data.username;
        res.json(true);
        console.log(req.session);
        return;
      }
      res.json(false);
    }).catch(err => 
      console.log(err))
});

/* Logout current user. */
router.put('/', function(req, res, next){
  req.session.username = null;
  res.json(true);
})

/* Register a new user. */
router.post('/', registerCheck, function (req, res, next) {
  
  const {username, password} = req.body;
  addUser(username, password)
  .then(data => {
    if(data.affectedRows === 1){
      req.session.username = data.username;
      res.json("SUCCESS");
      return;
    }
    res.json(false);
  })
  .catch(err => {
    console.log(err);
    res.json(false);
  });

})

module.exports = router;
