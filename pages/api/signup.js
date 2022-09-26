import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req,res) => {

    let success = false;

    if(req.method == 'POST'){
        const {name, email} = req.body
        let u = new User({name, email, password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()});
        // console.log("s", req.body);0
        await u.save()
        success = true;

        
    res.status(200).json({success: success});
    }else{
        res.status(400).json({error: "This method is not allowed"});
    }
        
    }


export default connectDb(handler);