import Layout from "./components/Layout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import Cart from "./pages/Cart";
import { Provider } from "react-redux";
import store from "./store/store";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <div>
      <Provider store={store}>
        <ToastContainer/>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />} />
            {/* Homepage */}
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            {/* Page not found */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App
