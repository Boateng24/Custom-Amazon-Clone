import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLocationDot, faMagnifyingGlass, faCartArrowDown} from '@fortawesome/free-solid-svg-icons';
import i18next from '../config/language/language';
const Header = () => {
  
  return (
    <div className="main-nav flex h-16 items-center bg-slate-800 sticky top-0 z-[100] w-screen">
      {/* Amazon logo */}
      <div className="nav-logo object-contain cursor-pointer">
        <img
          src="/amazon-2-logo-svgrepo-com.svg"
          alt="Amazon Logo"
          id="nav-logo-img"
          className=" w-32 m-5"
        />
      </div>

      {/* Delivery logo and text */}
      <div className="delivery cursor-pointer">
        <span className="first-delivery-span text-white font-extralight text-xs ml-4">
          Deliver to
        </span>
        <div className="flex space-x-1">
          <FontAwesomeIcon icon={faLocationDot} className="text-white mb-1" />
          <span className="second-delivery-span text-white font-bold text-sm">
            Ghana
          </span>
        </div>
      </div>

      {/* Search bar */}
      <div className="searchcontainer m-4">
        <div className="search-bar w-[900px] h-10 bg-white flex rounded-sm overflow-hidden">
          <input
            type="text"
            className="search-input w-fit mx-12 bg-slate-50 h-8 mt-1 border-gray-300 focus:border-transparent focus:outline-none"
            placeholder="Search Amazon"
          />
          <div className="absolute justify-start flex space-x-4 w-10 drop-shadow-2xl border border-gray-300 cursor-pointer">
            <p className="mt-3.5 text-xs m-2">All</p>
              <select className="nav-search-dropdown bg-inherit fixed mt-3 cursor-pointer">
                {/* <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option> */}
              </select>
          </div>
          <div className="m-auto w-14 bg-yellow-200 h-10 justify-end right-0 mr-0">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="mt-3.5 flex ml-5"
            />
          </div>
        </div>
      </div>

      <div className="hearder__nav flex">
        <div className="language__nav">
          {/* language widget */}
         <select defaultValue={"EN"} className="text-white mt-3 font-bold cursor-pointer">
          <option>EN</option>
          <option>GH</option>
         </select>
        </div>

        <div className="greeting__nav flex flex-col mx-2 text-white ml-8">
          {/* Welcome and Account List */}
          <span className="greet text-xs">Hello, User</span>
          <span className="auth font-medium cursor-pointer">Sign In</span>
        </div>

        <div className="returns__orders__nav flex flex-col mx-2 text-white ml-8 cursor-pointer">
          {/* Returns and orders */}
          <span className="return text-xs">Returns</span>
          <span className="orders font-medium">& Orders</span>
        </div>

        <div className="cart__items flex items-start ml-8">{/* Cart icon with text */}</div>
          <FontAwesomeIcon icon={faCartArrowDown} className="text-white text-3xl mt-1 cursor-pointer"/>
          <span className="header__optionLineTwo header__baskentCount text-white ml-1">0</span>
      </div>
    </div>
  );
}

export default Header