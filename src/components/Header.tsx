import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCartArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";
import {useTranslation} from 'react-i18next'
import { Select, SelectChangeEvent, MenuItem, } from "@mui/material";
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Country} from '../@types'



const Header = () => {
  const [location, setLocation] = useState<Country>()
  const {t, i18n} = useTranslation()

  const navigate = useNavigate();
  const cartItemsCount = useSelector(
    (state: RootState) => state.addItemToBasket.products.length
  );
  const [user] = useAuthState(auth);

  const handleAuth = () => {
    if (user) {
      try {
        auth.signOut();
        toast.success(`${user.displayName} is successfully signed out`);
      } catch (error) {
        console.log(error);
        toast.error(error as string);
      }
    }
  };

  const changeLanguage = (e:SelectChangeEvent) => {
      i18n.changeLanguage(e.target.value).then(lang => {
        console.log(lang)
      })
  }

 const fetchLocation = async() => {
    const {data} = await axios.get(
      `https://api.geoapify.com/v1/ipinfo?&apiKey=${import.meta.env.VITE_APP_LOCATION}`
    );
    setLocation(data)
    console.log(data)
 }

 useEffect(() => {
   fetchLocation()
 }, [])
 

  return (
    <div className="main-nav flex h-16 items-center bg-slate-800 sticky top-0 z-[100] w-screen">
      {/* Amazon logo */}
      <div
        className="nav-logo object-contain cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/amazon-2-logo-svgrepo-com.svg"
          alt="Amazon Logo"
          id="nav-logo-img"
          className=" w-32 m-5"
        />
      </div>

      {/* Delivery logo and text */}
      <div className="delivery cursor-pointer">
        <span className="first-delivery-span text-white text-xs ml-4">
          {t("deliver")}
        </span>
        <div className="flex space-x-1">
          <FontAwesomeIcon icon={faLocationDot} className="text-white mb-1" />
          <span className="second-delivery-span text-white font-bold text-sm">
            {location?.country.name}
          </span>
        </div>
      </div>

      {/* Search bar */}
      <SearchBar />

      <div className="hearder__nav flex">
        <div className="language__nav">
          {/* language widget */}
          <Select
            className="mt-3 font-bold cursor-pointer bg-white h-10 w-100%"
            onChange={changeLanguage}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="gh">GH</MenuItem>    
          </Select>
        </div>

        <Link to={!user ? "/login" : "/"}>
          <div
            className="greeting__nav flex flex-col mx-2 text-white ml-8"
            onClick={handleAuth}
          >
            {/* Welcome and Account List */}
            <span className="greet text-xs">
              {t("hello")}, {user ? user.displayName : t("user")}
            </span>
            <span className="auth font-medium cursor-pointer">
              {user ? t("signup") : t("signIn")}
            </span>
          </div>
        </Link>

        <div
          className="returns__orders__nav flex flex-col mx-2 text-white ml-8 cursor-pointer"
          onClick={() => navigate("/orders")}
        >
          {/* Returns and orders */}
          <span className="return text-xs">{t("returns")}</span>
          <span className="orders font-medium">& {t("orders")}</span>
        </div>

        <div className="cart__items flex items-start ml-8">
          {/* Cart icon with text */}
          <FontAwesomeIcon
            icon={faCartArrowDown}
            className="text-white text-3xl mt-1 cursor-pointer"
            onClick={() => navigate("/cart")}
          />
          <span className="header__optionLineTwo header__baskentCount text-white ml-1">
            {cartItemsCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
