import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  StripeCardElement,
  StripeCardElementChangeEvent,
} from "@stripe/stripe-js/types/stripe-js/elements/card";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "../slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import stripeApifetch from "../api/stripeApi";
import { useNavigate } from "react-router-dom";
import { StripeCardNumberElement } from "@stripe/stripe-js/types/stripe-js/elements/card-number";
import { AppDispatch } from "../store/store";
import { emptyBasket } from "../slices/cartSlice";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const PaymentForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { products } = useSelector((state: RootState) => state.addItemToBasket);
  const user = useSelector((state: RootState) => state.auth.user?.user);

  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      // response variable is in accordince to the current cedi to dollar rate
      const response: any = await stripeApifetch({
        method: "post",
        url: `/payments/create?total=${getCartTotal(products)}`,
      });
      console.log("THIS IS THE STRIPE RESPONSE", response);
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [products]);
  console.log("THE CLIENT SECRET IS:", clientSecret);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

     await stripe
      ?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements?.getElement(CardElement) as
            | StripeCardElement
            | StripeCardNumberElement
            | { token: string },
        },
      })
      .then(({ paymentIntent }) => {
        if (user?.uid && paymentIntent?.id) {
          // payment intent is the same as confirm confirmation
          const orderRef = doc(
            db,
            "users",
            user.uid,
            "orders",
            paymentIntent.id
          );
          setDoc(orderRef, {
            products: products,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
          setSucceeded(true);
          setError("");
          dispatch(emptyBasket());
          navigate("/orders");
        } else {
          throw new Error("UID or PaymentIntent ID is missing");
        }
      })
      .catch((error) => {
        console.log("Payment error:", error);
        setError(error.error.message);
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  const handleChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <CardElement onChange={handleChange} />
      <div className="paymentprice__container">
        <CurrencyFormat
          renderText={(value) => (
            <h3>
              Order Value: <strong>{value}</strong>
            </h3>
          )}
          decimalScale={2}
          value={getCartTotal(products)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Gh₵"}
        />

        <button
          type="submit"
          disabled={processing || disabled || succeeded}
          style={{
            background: '#f0c14b',
            borderRadius: '2px',
            width: '100%',
            height: '38px',
            border: '1px solid',
            fontWeight: 'bolder',
            marginTop: '10px',
            borderColor: '#a88734 #9c7e31 #846a29',
            color: 'black'
          }}
        >
          <span>{processing ? "Processing" : "Buy Now"}</span>
        </button>
      </div>

      {/* Errors */}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
};

export default PaymentForm;
