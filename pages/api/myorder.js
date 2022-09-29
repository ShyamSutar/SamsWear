import jsonwebtoken from "jsonwebtoken";
import connectDb from "../../middleware/mongoose"
import Order from "../../models/Order"

const handler = async (req,res) => {
    const token = req.body.token;
    const data = jsonwebtoken.verify(token, process.env.SECRET_KEY)
    let orders = await Order.find({email : data.email});
    res.status(200).json({orders})
}

export default connectDb(handler);