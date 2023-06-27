import {useState,ChangeEvent, useEffect} from 'react';
import axiosConfig from "../api/axiosInstance";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useDispatch} from 'react-redux';
import { AppDispatch } from '../store/store';
import { setSearch } from '../slices/searchSlice';
import {Select, MenuItem, SelectChangeEvent} from '@mui/material';
import { useTranslation } from "react-i18next";

const SearchBar = () => {
    const [categories, setCategories] = useState([]);
    const [categoryChange, setCategorychange] = useState('All')

    const dispatchSearch = useDispatch<AppDispatch>()
    const {t} = useTranslation();

    const fetchCategories = async () => {
      try {
        const { data } = await axiosConfig.get("/products/categories");
        console.log("category data", data);
        setCategories(data);
      } catch (error) {
        console.log("fetching category error", error);
      }
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      dispatchSearch(setSearch(e.target.value))
    };

    const handleCategoryChange = (e:SelectChangeEvent) => {
      setCategorychange(e.target.value);
    };

    useEffect(() => {
     fetchCategories()
    }, [])
    

  return (
    <div className="searchcontainer m-4">
      <div className="search-bar w-[900px] h-10 bg-white flex rounded-sm overflow-hidden">
        <input
          type="text"
          className="search-input w-fit mx-44 bg-slate-50 h-8 mt-1 border-gray-300 focus:border-transparent focus:outline-none"
          placeholder={t("search")}
          onChange={handleSearch}
        />
        <div className="absolute justify-start border border-gray-300 cursor-pointer">
          <Select
            className="nav-search-dropdown bg-inherit h-10 cursor-pointer w-fit text-sm"
            onChange={handleCategoryChange}
            value={categoryChange}
            sx={{border:'none'}}
          >
            <MenuItem value="All">{t('all')}</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="m-auto w-14 bg-yellow-200 h-10 justify-end right-0 mr-0">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="mt-3.5 flex ml-5"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar