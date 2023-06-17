import Layout from "./components/Layout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./store/store";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import CheckOut from "./pages/CheckOut";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Order from "./pages/Orders";


 const stripePromise = loadStripe(
   "pk_test_51NFIx2DNziNCShyYqxXVhy0GyVQXrCYcU8E6R5Whsd6LeIQnuovmvTRif7Ma0zoUXTErF2atGEIyvezhoJyksghj00rgv55djq"
 );

function App() {
    
  return (
    <div>
      <Provider store={store}>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />} />
            {/* Homepage */}
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <Elements stripe={stripePromise}>
                  <CheckOut />
                </Elements>
              }
            />
            <Route path="/orders" element={<Order/>}/>
            {/* Page not found */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App
