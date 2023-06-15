import User from "../models/User.js";
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_KEY);

export const createPayment = async (req, res) => {
  const { id } = req.user;
  const user = await User.findByPk(id);
  const { line1, line2, postal_code, state, tracking_number, carrier } =
    req.body;
  stripe.charges.create(
    {
      amount: "11111",
      source: "tok_visa",
      currency: "usd",
      // customer: user.email,
      receipt_email: user.email,
      description: "Purphase",
      shipping: {
        name: user.first_name,
        phone: user.phone,
        carrier: carrier,
        tracking_number: tracking_number,
        address: {
          city: user.city,
          country: user.country,
          line1: line1,
          line2: line2,
          postal_code: postal_code,
          state: state,
        },
      },
      // set what ever you want of information
      metadata: {
        order_id: "6735",
        email: user.email,
        id: user.id,
        address: user.address,
      },
    },
    function (err, charge) {
      if (err) {
        console.error(err);
      } else {
        return res.json(charge);
      }
    }
  );
};
