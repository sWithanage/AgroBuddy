const express = require("express");
const router = express.Router();

var sql = require('../app')
router.get('/',(req,res)=>{
    sql.query('SELECT * FROM user', (err,rows,field)=>{
        if(!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
});

module.exports = router;