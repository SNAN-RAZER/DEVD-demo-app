const router = require('express').Router();
const verify = require('./VerifyToken');
router.get('/',verify,(req,res)=>{
    res.json({
        posts:{
            title:'My first Post',
            description:'Random data you should not access'
        }
    })
})

module.exports=router;