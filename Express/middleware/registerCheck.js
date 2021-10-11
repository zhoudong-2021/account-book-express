const { getUserByName } = require("../controller/usersController");


module.exports = (req, res, next) => {
    const { username, password } = req.body;
    if (!(username && password)) {
        res.json(false);
        return;
    }
    
    getUserByName(username).then(data => {

        if(data.username){
            res.json("REGISTERED");
            return;
        }
        next();
    })
    
    
    // (getUserByName(username)).then(data => {
    //     console.log(data);
    //     // if(data[0].username)
    //     res.json("REGISTERED");
    //     return;

    // })
}