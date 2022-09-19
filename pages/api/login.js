import User from "../../models/User";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    // console.log("l",req.body);

    if (user) {
      if (req.body.email == user.email && req.body.password == user.password) {
        res.status(200).json({ success: true});
      }
    else{
        res.status(400).json({ success: false,error: "Not valid credentials" });
    }
  } else {
    res.status(400).json({success: false,error: "This method is not allowed" });
  }
}
};

export default connectDb(handler);
