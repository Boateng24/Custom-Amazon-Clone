import CurrencyFormat from "react-currency-format";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getCartTotal } from "../slices/cartSlice";

const Subtotal = () => {
    const {products} = useSelector((state:RootState) => state.addItemToBasket)
  return (
    <div className="subtotal flex flex-col justify-between w-80 h-40 p-5 bg-slate-50 border border-gray-300 rounded-md">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subotal ({products.length}items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift flex items-center">
              <input type="checkbox" className="mr-[5px]" /> This order contains
              a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getCartTotal(products)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Gh₵"}
      />
      <Button
        sx={{ border: "1px solid", color: "black", backgroundColor: "#f0c14b", borderRadius:'2px', width:'100%', height:'30px', marginTop:'10px', borderColor:'#a88734 #9c7e31 #846a29' }}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Subtotal;
