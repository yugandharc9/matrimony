import React, { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
    const [filterParams,setFilterParams] = useState({});
    
    const saveParams= (params) => {
        setFilterParams(params);
    }

    const clearParams= () => {
        setFilterParams({});
    }
    
    const removeFilter = (keyToRemove) => {
        let newFilter = Object.fromEntries(
            Object.entries(filterParams).filter(([key]) => key !== keyToRemove)
          );
        setFilterParams(newFilter);
    }
    
    return (    
    <FilterContext.Provider value={{saveParams,clearParams,filterParams,removeFilter}}>
      {children}
    </FilterContext.Provider>
    )
}