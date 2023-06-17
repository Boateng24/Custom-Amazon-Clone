/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import express, { Request, Response } from "express";
import cors from "cors";
import paymentRouter from "./routes/payment.route";
import * as functions from 'firebase-functions'
// import { corsOptions } from "./helpers/corsOptions";

// App config
const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// routes
app.use("/v1", paymentRouter);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("very cool and running would overcome it surely, promise");
  functions.logger.log("Server connected Successfully")
});

export const api = functions.runWith({ memory: '256MB', maxInstances: 10 }).https.onRequest(app)
