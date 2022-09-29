import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";


const handler = async (req,res) => {

    let success = false;

    if(req.method == 'POST'){
        

        //check if the cart is tampered with
        let product, sumTotal=0;
        let cart = req.body.cart
        for(let item in req.body.cart){
            sumTotal += cart[item].price * cart[item].qty
            console.log(item);
            product = await Product.findOne({slug: item})
            if(product.price != cart[item].price){
                res.status(200).json({"error": true})
            }
        }

        if(sumTotal !== req.body.subTotal){
            res.status(200).json({"error":true})
        }

        //check if the cart items are out of stock

        //check if the details are valid

        const u = new Order({
            email: req.body.email,
            orderId: req.body.oid,
            address: req.body.address,
            amount: req.body.subTotal,
            products: req.body.cart});

        await u.save()

        
        success = true;



        
    res.status(200).json({success: success, id:u.id});
    // res.redirect('/order',200).json({success:success})
    

    }else{
        res.status(400).json({error: "This method is not allowed"});
    }
        
    }


export default connectDb(handler);