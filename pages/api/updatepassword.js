import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";
import cryptoJs from "crypto-js";


const handler = async (req,res) => {
    let success= false
        if(req.method == "POST"){
            let token = req.body.token;
            let user = jsonwebtoken.verify(token, process.env.SECRET_KEY);

            let dbuser = await User.findOne({email: user.email})
            const decryptedPassword = cryptoJs.AES.decrypt(dbuser.password ,process.env.SECRET_KEY).toString(cryptoJs.enc.Utf8)

            if(req.body.currentpassword == req.body.npassword){
                res.status(200).json({error: "try different password"})
            }

            if(decryptedPassword == req.body.currentpassword && req.body.npassword == req.body.cpassword){

                let dbuser = await User.findOneAndUpdate({email: user.email},{password:cryptoJs.AES.encrypt(req.body.npassword, process.env.SECRET_KEY).toString()})
            }else{
                res.status(200).json({error: "incorrect password or passwords do not matched"})
            }
        }else{
            res.status(200).json({error:"error"})
        }
        res.status(200).json({success: true});
        }


export default connectDb(handler);