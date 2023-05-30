import Header from "../components/Header"
import CartBanner from '../assets/CheckoutImg.jpg'
import Subtotal from "../components/Subtotal";
import {useSelector} from 'react-redux'
import { RootState } from "../store/store";
import CartProduct from "../components/CartProduct";

const Cart = () => {
  const {products} = useSelector((state:RootState) => state.addItemToBasket)
  return (
    <>
    <Header/>
      <div className="checkout bg-white h-auto flex p-5">
        <div className="cart__left">
          <img
            src={CartBanner}
            alt="Checkout Image"
            className="w-[95%] mb-10"
          />

          <div>
            <h2 className="cart__title mr-3 p-3 border-b border-gray-300">Your Cart goes here</h2>
            {
              products.map((product) => (
                <CartProduct
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  category={product.category}
                />
              ))
            }
          </div>
        </div>

        <div className="cartout__right">
          <Subtotal/>
        </div>
      </div>
    </>
  );
}

export default Cart