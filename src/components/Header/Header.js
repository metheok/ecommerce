// Header.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Badge,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import css from "./Header.module.css";
import { logoutAndClearUser } from "../../state/auth/authSlice";
import { useDispatch } from "react-redux";

const Header = ({
  user,
  changeSearch,
  onShowCategoryModal,
  showCategoryModal,
  searchText,
}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    setSearch(searchText);
  }, [searchText]);
  const cart = user?.cart;
  return (
    <AppBar className="appBar" color="secondary" position="sticky">
      <Toolbar className={css.toolbar}>
        <div className={css.logo}>
          <Typography variant="h6">E-Commerce</Typography>
        </div>
        <div className={css.categoryButton}>
          <Button
            variant="contained"
            onClick={onShowCategoryModal}
            color="primary"
          >
            Category
          </Button>
        </div>

        <div
          className={css.search}
          onClick={() => {
            changeSearch(search);
          }}
        >
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            className={css.input}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
          <div
            // style={{ display: "none" }}
            className={css.searchIcon}
          >
            <ArrowRightAltIcon />
          </div>
        </div>

        <div className={css.cart}>
          <Badge badgeContent={cart?.length || 0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </div>
        <div className={css.logoutButton}>
          <Button
            variant="contained"
            onClick={() => dispatch(logoutAndClearUser())}
            color="error"
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
