import { productType } from "../@types";
import HoverRating from "./Ratings";
import {Button} from '@mui/material';
import { useDispatch} from 'react-redux';
import { AppDispatch } from "../store/store";
import { removeItem } from "../slices/cartSlice";

const CartProduct = ({id, image, title, description, price, category}:productType) => {
    const dispatch = useDispatch<AppDispatch>();

   const handleRemoveCartItem = (id:number) => {
        dispatch(removeItem(id))
   }
  return (
    <div className="cartProduct flex mt-5 mb-5">
      <img src={image} alt="" className="cartImage w-96 h-80 object-contain" />
      <div className="cartProductInfo">
        <p className="productTitle font-bold text-lg">{title}</p>
        <p className="productPrice text-sm">
          <strong>Gh₵</strong>
          <strong>{price}</strong>
        </p>
        <p className="productDescription w-44 text-xs">{description}</p>
        <HoverRating />
        <strong>{category}</strong>
        <div className="removeItembtn">
          <Button
            sx={{
              backgroundColor: "#f0c14b",
              fontWeight: "bold",
              color: "black",
              marginTop: "15px",
            }}
            onClick={()=>handleRemoveCartItem(id)}
          >
            Remove from Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct