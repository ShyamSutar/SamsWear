import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";
import cryptoJs from "crypto-js";


const handler = async (req,res) => {
    let success= false
        if(req.method == "POST"){
            let token = req.body.token;
            let user = jsonwebtoken.verify(token, process.env.SECRET_KEY);
            if(req.body.cpassword == req.body.password){
            let dbuser = await User.findOneAndUpdate({email: user.email},{password:cryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()})
        }else{
            res.status(200).json({error:"error"})
        }
        res.status(200).json({success: true});
        }else{
            res.status(400).json({error:"error"})
        }
    }


export default connectDb(handler);