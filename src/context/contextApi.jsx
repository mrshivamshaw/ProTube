import React, { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api.js";
export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [focus, setFocus] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(true);

    useEffect(() => {
        fetchSelectedCategoryData(selectedCategory);
    }, [selectedCategory]);

    const fetchSelectedCategoryData = (query) => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
            setSearchResults(contents)
            console.log(searchResults);
            console.log("api");
            setLoading(false);
        });
    };

    return (
        <Context.Provider
            value={{
                loading,
                setLoading,
                searchResults,
                selectedCategory,
                setSelectedCategory,
                mobileMenu,
                setMobileMenu,
                searchQuery, 
                setSearchQuery,
                focus,
                setFocus,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
