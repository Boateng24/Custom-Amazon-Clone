import { useState, useEffect } from "react";
import axiosConfig from "../api/axiosInstance";
import HoverRating from "./Ratings";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);
  const numRows = Math.ceil(products.length / 4);

  const fetchProducts = async () => {
    try {
        const { data } = await axiosConfig.get("/products");
        setProducts(data);
        console.log("data", data);
    } catch (error) {
        console.error("Error while fetching data", error)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10
      }}
    >
      {/* Create a flex container for each row */}
      {Array.from({ length: numRows }, (_, index) => (
        <div key={index} style={{ display: "flex", gap: "0.3rem" }}>
          {/* Render four cards in each row */}
          {products.slice(index * 4, index * 4 + 4).map((product: any) => (
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
                    &#8373;{product.price}
                  </Typography>
                  <HoverRating/>
                  <Typography variant="body2" style={{ fontWeight: "bold" }}>
                    {product.category}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Products;
