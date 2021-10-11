
module.exports = (req, res, next)=> {
    if(req.session.username){
        next();
        return;
    }
    res.json(false);
}
