import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CartProduct from "../components/CartProduct";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import PaymentForm from "../components/PaymentForm";


const CheckOut = () => {

  const [user] = useAuthState(auth);
  const {products} = useSelector((state:RootState) => state.addItemToBasket)
  return (
    <div className="payment_checkout bg-white">
      <Header />
      <div className="payment__container">
        <h1 className="text-center py-2 font-semibold bg-gray-200 border-b border-gray-300">
          Checkout(
          <Link to={"/checkout"}>
            {products?.length} {""} {products?.length > 1 ? "items" : "item"}
          </Link>
          )
        </h1>
        {/* Address details section*/}
        <div className="delivery__address flex p-5 mx-20 border-b border-gray-300">
          <div className="delivery__title flex-[0.2]">
            <h1 className="font-bold">Delivery Address</h1>
          </div>
          <div className="address__details flex-[0.8]">
            <h3 className="text-base">{user?.email}</h3>
            <h3 className="text-sm">Racecourse, Takoradi Ghana</h3>
            <h3 className="text-sm">Shell Filling Station, Street 1</h3>
          </div>
        </div>

        {/* Items details section */}
        <div className="itemsbeing_purchased flex p-5 mx-20 border-b border-gray-300">
          <div className="itemsadded_title flex-[0.2]">
            <h1 className="font-bold">Review Items & Delivery</h1>
          </div>

          <div className="items_added flex-[0.8]">
            {products.map((product) => (
              <CartProduct
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                category={product.category}
                hideButton={!product.hideButton}
              />
            ))}
          </div>
        </div>

        {/* Payment method section */}
        <div className="payment__method flex p-5 mx-20 border-b border-gray-300">
          <div className="payment__title flex-[0.2]">
            <h1 className="font-bold">Payment Method</h1>
          </div>

          <div className="payment__details flex-[0.8]">
            {/* stripe payment logic would go in here */}
            {/* <h1 className="font-bold">Card Details</h1> */}
                <PaymentForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
