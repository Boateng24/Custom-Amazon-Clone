import { useState, useEffect } from "react";
import axiosConfig from "../api/axiosInstance";
import HoverRating from "./Ratings";

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { addItem } from "../slices/cartSlice";
import { productType } from "../@types";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";
import notFound from '../assets/notfound.jpg'

const Products: React.FC = () => {
  const [products, setProducts] = useState<productType[]>([]);
  const numRows = Math.ceil(products.length / 4);

  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector((state: RootState) => state.search.searchItem);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosConfig.get("/products");
      setProducts(data);
      console.log("data", data);
    } catch (error) {
      console.error("Error while fetching data", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product: productType) => {
    dispatch(addItem(product));
    console.log(product);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
      }}
    >
      {/* Create a flex container for each row */}
      {filteredProducts.length > 0 ? (
        Array.from({ length: numRows }, (_, index) => (
          <div key={index} style={{ display: "flex", gap: "0.3rem" }}>
            {/* Render four cards in each row */}
            {filteredProducts
              .slice(index * 4, index * 4 + 4)
              .map((product: any) => (
                <Card
                  key={product.id}
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    objectFit: "contain",
                  }}
                >
                  <CardActionArea style={{ flex: "1 0 auto" }}>
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.title}
                      sx={{
                        width: 250,
                        height: 200,
                        marginLeft: "15%",
                        objectFit: "contain",
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        style={{ marginBottom: "0.5rem", fontSize: 15 }}
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          maxWidth: "100%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          marginBottom: "0.5rem",
                          fontSize: 10,
                        }}
                      >
                        {product.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                      >
                        Gh₵{product.price}
                      </Typography>
                      <HoverRating />
                      <Typography
                        variant="body2"
                        style={{ fontWeight: "bold" }}
                      >
                        {product.category}
                      </Typography>
                      <Button
                        sx={{
                          backgroundColor: "rgb(251, 219, 35)",
                          fontWeight: "bold",
                          color: "black",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: "34%",
                        }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Cart
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
          </div>
        ))
      ) : (
        <div className="flex flex-col">
          <h1 className="bg-white text-6xl font-bold items-center justify-center text-center">
            No Product Found
          </h1>
          <img src={notFound} alt="Notfound" className="object-contain" />
        </div>
      )}
    </div>
  );
};

export default Products;
