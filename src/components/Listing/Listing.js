import React from "react";
import { Grid, CardMedia, makeStyles } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import css from "./Listing.module.css";
import { Card, CardContent, Typography, Button, Chip } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
const noImg = require("./noImg.png");
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: "300px",
    objectFit: "contain",
    border: "1px solid #ddd",
  },
}));

const Listing = ({
  data,
  onPageChange,
  pagination,
  cart,
  cartChange,
  categories,
}) => {
  const classes = useStyles();
  if (!data || !data.length) {
    return (
      <div className={css.listingPage}>
        <h2 variant="h4" className={css.heading}>
          Total Items: <span style={{ color: "gray" }}>0</span>
        </h2>
      </div>
    );
  }
  return (
    <div className={css.listingPage}>
      <h2 variant="h4" className={css.heading}>
        Total Items:{" "}
        <span style={{ color: "gray" }}>{pagination.totalItems}</span>
      </h2>

      <div className={css.productList}>
        <Grid container spacing={3}>
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={item.image || noImg}
                  title={item.name}
                />
                <CardContent>
                  <Typography variant="h6" className={css.productName}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" className={css.category}>
                    {
                      categories.find(
                        (category) => category._id === item.category
                      ).name
                    }
                  </Typography>
                  <Typography variant="h5" className={css.price}>
                    ${item.price || 22.99}
                  </Typography>
                  <div className={css.actions}>
                    <Typography variant="body2" className={css.vegNonVeg}>
                      {item.type === "veg" ? "Veg" : "Non-Veg"}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => {
                        cartChange(
                          item._id,
                          cart.find((cartItem) => cartItem === item._id)
                            ? false
                            : true
                        );
                      }}
                      style={{ width: "40%" }}
                      color={
                        cart.find((cartItem) => cartItem === item._id)
                          ? "error"
                          : "primary"
                      }
                      className={css.addToCart}
                    >
                      {cart.find((cartItem) => cartItem === item._id)
                        ? "Remove"
                        : "Add"}
                      <ShoppingCartIcon style={{ paddingLeft: "12px" }} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <div className={css.pagination}>
        <Pagination
          count={pagination.totalPages}
          page={pagination.currentPage}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Listing;
