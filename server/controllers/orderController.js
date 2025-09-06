import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";
import User from "../models/User.js";
//place order COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;
    if (!address || items.length === 0) {
      res.json({ success: false, message: "Invalid data" });
    }
    //Calculate total amount using Items
    // let amount = await items.reduce(async (acc, item) => {
    //   const product = await Product.findById(item.product);
    //   return acc + product.offerPrice * item.quantity;
    // }, 0);

    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      amount += product.offerPrice * item.quantity;
    }



    //Add tax charge
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//place order Stripe: /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;
    const { origin } = req.headers;
    if (!address || items.length === 0) {
      res.json({ success: false, message: "Invalid data" });
    }
    let productData = [];
    //Calculate total amount using Items
    // let amount = await items.reduce(async (acc, item) => {
    //   const product = await Product.findById(item.product);
    //   productData.push({
    //     name: product.name,
    //     price: product.offerPrice,
    //     quantity: item.quantity,
    //   });
    //   return acc + product.offerPrice * item.quantity;
    // }, 0);

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });

      amount += product.offerPrice * item.quantity;
    }


    //Add tax charge
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
      isPaid: false,
    });

    //Stripe gateway inilize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    //create line items for stripe
    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "aud",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
        },
        quantity: item.quantity,
      };
    });
    //create session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });
    res.json({ success: true, url: session.url });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Get Orders by userId : /api/order/user
export const getUsersOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Stripe Webhook to verify payment Action: /stripe
export const stripeWebhook = async (req, res) => {
    //stripe gateway inilize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripeInstance.webhooks.constructEvent(
        req.body, 
        sig, 
        process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.sendStatus(400).send(`Webhook Error: ${err.message}`);
    }
//     //handle the event
   switch (event.type) {
    case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        const paymentId = paymentIntent.id;

//         //getting session metadata
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentId,
        });
        const {orderId,userId} = session.data[0].metadata;

//         //mark payment as paid
        await Order.findByIdAndUpdate(orderId,{ isPaid: true});

//         //clear user cart
        await Cart.findOneAndUpdate({userId},{cartItems: []});
         break;   
   }
   case "payment_intent.failed":
    const paymentIntent = event.data.object;
        const paymentId = paymentIntent.id;

//         //getting session metadata
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentId,
        });
        const {orderId} = session.data[0].metadata;
//         //delete order
        await Order.findByIdAndDelete(orderId);
       break;
       
   default:
        console.log(`Unhandled event type ${event.type}`);
        break;
}
    res.json({received: true});
}



//Get All Orders : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


