import Forgot from "../../models/forgot"
import User from '../../models/User'

export default async function handler(req, res){
    // check if the user exists in the database
    // send an email to the user
    if(req.body.sendMail){
    let token = `sdfhlkasdjlfjasdsad3425salk`
    let forgot = new Forgot({
        email: req.body.email,
        token: token
    })

    let email = `We have sent you this email in response to your request to reset your password on SamsWear.
    
    To reset your password, please follow the link below:

    <a href="http://localhost:3000/forgot?token=${token}">Click here to reset your password</a>


    We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your ${site-name} My Account Page and change your password.`

    res.status(200).json({success: true})
}
else{
    // Reset User Password
    console.log("hello");
}
}