import { productType } from "../@types";
import HoverRating from "./Ratings";
import {Button} from '@mui/material';
import { useDispatch} from 'react-redux';
import { AppDispatch } from "../store/store";
import { removeItem } from "../slices/cartSlice";
import {Paper} from '@mui/material';

const CartProduct = ({id, image, title, description, price, category}:productType) => {
    const dispatch = useDispatch<AppDispatch>();

   const handleRemoveCartItem = (id:number) => {
        dispatch(removeItem(id))
   }
  return (
    <Paper variant="outlined" elevation={16} sx={{ marginBottom: "1rem" }}>
      <div className="cartProduct flex mt-5 mb-5">
        <img
          src={image}
          alt=""
          className="cartImage w-96 h-80 object-contain"
        />
        <div className="cartProductInfo ml-40">
          <p className="productTitle font-bold text-lg max-w-2xl">{title}</p>
          <p className="productPrice text-sm mb-2">
            <strong>Gh₵</strong>
            <strong>{price}</strong>
          </p>
          <p className="productDescription w-44 text-xs mb-2">{description}</p>
          <div className="rating mb-2">
            <HoverRating />
          </div>
          <div className="category">
            <strong>{category}</strong>
          </div>
          <div className="removeItembtn">
            <Button
              sx={{
                backgroundColor: "#f0c14b",
                fontWeight: "bold",
                color: "black",
                marginTop: "15px",
              }}
              onClick={() => handleRemoveCartItem(id)}
            >
              Remove from Cart
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default CartProduct