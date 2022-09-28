import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";

const handler = async (req,res) => {

    let success = false;

    if(req.method == 'POST'){
        

        //check if the cart is tampered with

        //check if the cart items are out of stock

        //check if the details are valid

        let u = new Order({
            email: req.body.email,
            orderId: req.body.oid,
            address: req.body.address,
            amount: req.body.subTotal,
            products: req.body.cart});

        await u.save()

        success = true;


        
    res.status(200).json({success: success});
    }else{
        res.status(400).json({error: "This method is not allowed"});
    }
        
    }


export default connectDb(handler);