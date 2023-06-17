import { Request, Response, NextFunction } from "express";
import * as logger from "firebase-functions/logger";
import { stripe } from "../config/stripe";

export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const total = parseFloat(req.query.total as string); // Convert total from string to float
    const amount = Math.round(total * 100); // Convert dollars to cents

    console.log("Payment received for a sum of", amount);

    const paymentItent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });
    res.status(201).send({
      clientSecret: paymentItent.client_secret,
    });
  } catch (error) {
    next(logger.error(error));
  }
};


export const receivedPayment = (req:Request, res:Response, next:NextFunction) => {
        try {
            res.send("Payment recieved successfully")
        } catch (error) {
            next(error)
        }
}