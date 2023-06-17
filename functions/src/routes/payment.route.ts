import express from 'express';
import { createPayment, receivedPayment } from '../controllers/payment.controller';

const paymentRouter = express.Router();

paymentRouter.post('/payments/create', createPayment);
paymentRouter.get('/received', receivedPayment)


export default paymentRouter;