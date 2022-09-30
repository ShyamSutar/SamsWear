import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";


const handler = async (req,res) => {

    let success = true;

    if(req.method == 'POST'){
        

        //check if the cart is tampered with
        let product, sumTotal=0;
        let cart = req.body.cart

        for(let item in req.body.cart){
            sumTotal += cart[item].price * cart[item].qty
            console.log(item);
            product = await Product.findOne({slug: item})
            
            
            //check if the cart items are out of stock
            if(product.availableQty < cart[item].qty){
                res.status(200).json({success:false, error: "Some items in your cart went out of stock, Please try again later..." })
                return
            }

            if(product.price != cart[item].price){
                res.status(400).json({success: false, errror: "Error"})
                return
            }
        }

        if(sumTotal !== req.body.subTotal){
            res.status(400).json({success: false, errror: "Error"})
            return
        }


        //check if the details are valid

        const u = new Order({
            email: req.body.email,
            orderId: req.body.oid,
            address: req.body.address,
            amount: req.body.subTotal,
            products: req.body.cart});

        await u.save()

        let products = (u.products)
        for(let slug in products){
            await Product.findOneAndUpdate({slug: slug}, {$inc: {"availableQty": -products[slug].qty}})
        }
        
        success = true;



        
    res.status(200).json({success: success, id:u.id});
    // res.redirect('/order',200).json({success:success})
    

    }else{
        res.status(400).json({error: "This method is not allowed"});
    }
        
    }


export default connectDb(handler);